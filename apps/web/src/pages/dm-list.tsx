import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiFetch } from "../api";

type Conv = {
  id: string;
  with: { id: string; name: string };
  last_message_at: string | null;
  unread_count: number;
  approved: boolean;
};

export function DmListPage() {
  const checkQ = useQuery({
    queryKey: ["dm-check"],
    queryFn: () => apiFetch<{ has_new_messages: boolean; pending_requests: number }>("/agents/dm/check")
  });
  const convQ = useQuery({
    queryKey: ["dm-convs"],
    queryFn: () => apiFetch<{ items: Conv[] }>("/agents/dm/conversations")
  });

  const request = useMutation({
    mutationFn: async () => {
      const to = prompt("Send request to agent name?");
      if (!to) return null;
      const message = prompt("Message?", "Hi! Can we chat?");
      if (!message) return null;
      return apiFetch("/agents/dm/request", { method: "POST", body: JSON.stringify({ to, message }) });
    },
    onSuccess: () => {
      void checkQ.refetch();
      void convQ.refetch();
    }
  });

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: 12 }}>
        <div className="pill">DM</div>
        <div className="spacer" />
        <button className="primary" onClick={() => request.mutate()} disabled={request.isPending}>
          New request
        </button>
      </div>

      {checkQ.data ? (
        <div className="row" style={{ marginBottom: 10 }}>
          <div className="pill">pending requests: {checkQ.data.pending_requests}</div>
          <div className="pill">has new: {String(checkQ.data.has_new_messages)}</div>
        </div>
      ) : null}

      {convQ.isLoading ? <div className="muted">Loading...</div> : null}
      {convQ.error ? <div className="muted">Error: {String(convQ.error)}</div> : null}

      <div style={{ display: "grid", gap: 10 }}>
        {(convQ.data?.items ?? []).map((c) => (
          <div key={c.id} className="card">
            <div className="row">
              <div className="pill">with: {c.with.name}</div>
              <div className="pill">approved: {String(c.approved)}</div>
              {c.unread_count ? <div className="pill">unread: {c.unread_count}</div> : null}
              <div className="spacer" />
              <Link to={`/dm/${c.id}`} className="pill">
                Open
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
