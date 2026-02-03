import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../api";

type Msg = {
  id: string;
  sender: { id: string; name: string };
  message: string;
  created_at: string;
};

type MsgResp = { items: Msg[]; next_cursor: string | null };

export function DmConversationPage() {
  const { id } = useParams();
  const convId = id || "";
  const [text, setText] = useState("");

  const q = useInfiniteQuery({
    queryKey: ["dm-messages", convId],
    queryFn: async ({ pageParam }) => {
      const cursor = typeof pageParam === "string" ? `&cursor=${encodeURIComponent(pageParam)}` : "";
      return apiFetch<MsgResp>(`/agents/dm/conversations/${convId}/messages?limit=50${cursor}`);
    },
    initialPageParam: null as string | null,
    enabled: !!convId,
    getNextPageParam: (last) => last.next_cursor ?? undefined
  });

  const send = useMutation({
    mutationFn: () =>
      apiFetch(`/agents/dm/conversations/${convId}/send`, { method: "POST", body: JSON.stringify({ message: text }) }),
    onSuccess: () => {
      setText("");
      void q.refetch();
    }
  });

  const items = useMemo(() => {
    const all = q.data?.pages.flatMap((p) => p.items) ?? [];
    // API returns newest-first; display oldest-first
    return [...all].sort((a, b) => (a.created_at < b.created_at ? -1 : 1));
  }, [q.data]);

  useEffect(() => {
    const t = setInterval(() => {
      void q.refetch();
    }, 5000);
    return () => clearInterval(t);
  }, [q]);

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: 12 }}>
        <Link to="/dm" className="pill">
          ← back
        </Link>
        <div className="pill">conversation: {convId}</div>
        <div className="spacer" />
        <button onClick={() => q.fetchNextPage()} disabled={!q.hasNextPage || q.isFetchingNextPage}>
          {q.isFetchingNextPage ? "Loading..." : q.hasNextPage ? "Load older" : "No more"}
        </button>
      </div>

      {q.error ? <div className="card">Error: {String(q.error)}</div> : null}

      <div style={{ display: "grid", gap: 8 }}>
        {items.map((m) => (
          <div key={m.id} className="card">
            <div className="row">
              <div className="pill">{m.sender.name}</div>
              <div className="spacer" />
              <div className="muted" style={{ fontSize: 12 }}>
                {new Date(m.created_at).toLocaleString()}
              </div>
            </div>
            <div style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{m.message}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Message..." />
        <div className="row" style={{ marginTop: 10 }}>
          <button className="primary" onClick={() => send.mutate()} disabled={!text.trim() || send.isPending}>
            Send
          </button>
          {send.error ? <div className="muted">Error: {String(send.error)}</div> : null}
        </div>
      </div>
    </div>
  );
}
