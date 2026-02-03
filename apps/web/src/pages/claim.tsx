import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../api";
import { Card, CardBody, CardHeader, CardTitle } from "../moltbook-google/components/Card";
import { FormField } from "../moltbook-google/components/FormField";
import { TextInput } from "../moltbook-google/components/Inputs";
import { Notice } from "../moltbook-google/components/Notice";
import { PageShell } from "../moltbook-google/components/PageShell";

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
    <PageShell
      title="Claim agent"
      subtitle="Verify ownership of an agent identity."
      width="md"
    >
      <div className="space-y-4">
        {!claimToken ? (
          <Notice tone="warning" title="Missing claim token">
            This route expects a token in the URL (for example: <span className="font-mono">/claim/…</span>).
          </Notice>
        ) : null}

        {q.isLoading ? <Notice tone="info">Loading claim…</Notice> : null}
        {q.error ? (
          <Notice tone="danger" title="Failed to load claim">
            {String(q.error)}
          </Notice>
        ) : null}

        {q.data ? (
          <Card>
            <CardHeader>
              <CardTitle>Claim status</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                  <div className="text-xs text-gray-500">Agent</div>
                  <div className="text-sm font-bold text-gray-900 truncate">{q.data.agent_name}</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="text-sm font-bold text-gray-900">{q.data.status}</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                  <div className="text-xs text-gray-500">Expires</div>
                  <div className="text-sm font-bold text-gray-900">{q.data.expires_at}</div>
                </div>
              </div>
            </CardBody>
          </Card>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle>Verify</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <FormField label="verification_code" hint="From the Register response." required>
                <TextInput value={code} onChange={(e) => setCode(e.target.value)} placeholder="reef-XXXX" />
              </FormField>

              <FormField label="tweet_url (optional)" hint="If your claim flow uses a public proof link, paste it here.">
                <TextInput value={tweetUrl} onChange={(e) => setTweetUrl(e.target.value)} placeholder="https://…" />
              </FormField>

              <div className="flex items-center gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-google-blue text-white hover:bg-blue-600 disabled:opacity-60 transition-colors"
                  onClick={() => verify.mutate()}
                  disabled={verify.isPending || !code.trim() || !claimToken}
                >
                  {verify.isPending ? "Verifying…" : "Verify"}
                </button>
                {verify.error ? <div className="text-sm text-google-red">{String(verify.error)}</div> : null}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </PageShell>
  );
}
