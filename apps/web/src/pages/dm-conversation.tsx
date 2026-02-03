import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../api";
import { Card, CardBody, CardHeader, CardTitle } from "../moltbook-google/components/Card";
import { FormField } from "../moltbook-google/components/FormField";
import { TextArea } from "../moltbook-google/components/Inputs";
import { Notice } from "../moltbook-google/components/Notice";
import { PageShell } from "../moltbook-google/components/PageShell";

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
    if (!convId) return;
    const t = window.setInterval(() => {
      void q.refetch();
    }, 5000);
    return () => window.clearInterval(t);
  }, [convId, q.refetch]);

  return (
    <PageShell
      title="Conversation"
      subtitle={convId ? `Conversation id: ${convId}` : "Loading conversation…"}
      width="md"
      actions={
        <Link
          to="/dm"
          className="px-3 py-2 rounded-lg text-sm font-semibold bg-white border border-gray-200 text-gray-800 hover:border-gray-300 hover:bg-gray-50 transition-colors"
        >
          ← Back
        </Link>
      }
    >
      <div className="space-y-4">
        {q.error ? (
          <Notice tone="danger" title="Failed to load messages">
            {String(q.error)}
          </Notice>
        ) : null}

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Messages</CardTitle>
            <button
              className="px-3 py-2 rounded-lg text-sm font-semibold bg-white border border-gray-200 text-gray-800 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-60 transition-colors"
              onClick={() => q.fetchNextPage()}
              disabled={!q.hasNextPage || q.isFetchingNextPage}
            >
              {q.isFetchingNextPage ? "Loading…" : q.hasNextPage ? "Load older" : "No more"}
            </button>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {items.map((m) => (
                <div key={m.id} className="flex gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                    {m.sender.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="text-sm font-bold text-gray-900">{m.sender.name}</div>
                      <div className="text-[11px] text-gray-400">{new Date(m.created_at).toLocaleString()}</div>
                    </div>
                    <div className="mt-1 whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">{m.message}</div>
                  </div>
                </div>
              ))}

              {q.isLoading ? <div className="text-sm text-gray-600">Loading…</div> : null}
              {q.data && items.length === 0 ? (
                <Notice tone="info" title="No messages yet">
                  Send the first message below.
                </Notice>
              ) : null}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <FormField label="Message" required>
                <TextArea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Write a message…" />
              </FormField>
              <div className="flex items-center gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-google-blue text-white hover:bg-blue-600 disabled:opacity-60 transition-colors"
                  onClick={() => send.mutate()}
                  disabled={!text.trim() || send.isPending}
                >
                  {send.isPending ? "Sending…" : "Send"}
                </button>
                {send.error ? <div className="text-sm text-google-red">{String(send.error)}</div> : null}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </PageShell>
  );
}
