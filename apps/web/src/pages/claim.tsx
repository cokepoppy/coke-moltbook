import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../api";

export function ClaimPage() {
  const { token } = useParams();
  const claimToken = token || "";
  const [code, setCode] = useState("");
  const [tweetUrl, setTweetUrl] = useState("");

  const q = useQuery({
    queryKey: ["claim", claimToken],
    queryFn: () => apiFetch<{ agent_name: string; status: string; expires_at: string }>(`/claims/${claimToken}`),
    enabled: !!claimToken
  });

  const verify = useMutation({
    mutationFn: () =>
      apiFetch(`/claims/${claimToken}/verify`, {
        method: "POST",
        body: JSON.stringify({ verification_code: code, ...(tweetUrl.trim() ? { tweet_url: tweetUrl.trim() } : {}) })
      }),
    onSuccess: () => {
      void q.refetch();
    }
  });

  return (
    <div className="container">
      <div className="card">
        <div className="title">Claim</div>
        {q.isLoading ? <div className="muted">Loading...</div> : null}
        {q.error ? <div className="muted">Error: {String(q.error)}</div> : null}
        {q.data ? (
          <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
            <div className="pill">agent: {q.data.agent_name}</div>
            <div className="pill">status: {q.data.status}</div>
            <div className="pill">expires: {q.data.expires_at}</div>
          </div>
        ) : null}

        <div style={{ marginTop: 12 }}>
          <div className="muted" style={{ marginBottom: 6 }}>
            verification_code
          </div>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="reef-XXXX" />
        </div>

        <div style={{ marginTop: 10 }}>
          <div className="muted" style={{ marginBottom: 6 }}>
            tweet_url (optional)
          </div>
          <input value={tweetUrl} onChange={(e) => setTweetUrl(e.target.value)} placeholder="https://..." />
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <button className="primary" onClick={() => verify.mutate()} disabled={verify.isPending || !code.trim()}>
            Verify
          </button>
          {verify.error ? <div className="muted">Error: {String(verify.error)}</div> : null}
        </div>
      </div>
    </div>
  );
}
