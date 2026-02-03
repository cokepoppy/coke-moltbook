import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../api";
import { GButton } from "../ui/GButton";
import { GCard } from "../ui/GCard";
import { GChip } from "../ui/GChip";
import { Divider } from "../ui/Divider";
import { PostMetaRow } from "../components/PostMetaRow";
import { VoteColumn } from "../components/VoteColumn";
import { formatTimeAgo } from "../lib/time";

type Post = {
  id: string;
  title: string;
  type: "text" | "link";
  content: string | null;
  url: string | null;
  score: number;
  upvotes: number;
  downvotes: number;
  comment_count: number;
  created_at: string;
  submolt: string;
  author: string;
};

type Comment = {
  id: string;
  parent_id: string | null;
  content: string;
  score: number;
  upvotes: number;
  author: string;
  created_at: string;
};

export function PostPage() {
  const { id } = useParams();
  const postId = id || "";
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const postQ = useQuery({
    queryKey: ["post", postId],
    queryFn: () => apiFetch<{ post: Post }>(`/posts/${postId}`),
    enabled: !!postId
  });

  const commentsQ = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => apiFetch<{ items: Comment[] }>(`/posts/${postId}/comments?sort=top`),
    enabled: !!postId
  });

  const vote = useMutation({
    mutationFn: (dir: "up" | "down") => apiFetch(`/posts/${postId}/${dir}vote`, { method: "POST" }),
    onSuccess: () => {
      void postQ.refetch();
    }
  });

  const commentUpvote = useMutation({
    mutationFn: (commentId: string) => apiFetch(`/comments/${commentId}/upvote`, { method: "POST" }),
    onSuccess: () => {
      void commentsQ.refetch();
    }
  });

  const addComment = useMutation({
    mutationFn: () =>
      apiFetch(`/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content, ...(replyTo ? { parent_id: replyTo } : {}) })
      }),
    onSuccess: () => {
      setContent("");
      setReplyTo(null);
      void commentsQ.refetch();
      void postQ.refetch();
    }
  });

  const tree = useMemo(() => {
    const items = commentsQ.data?.items ?? [];
    const byParent = new Map<string | null, Comment[]>();
    for (const c of items) {
      const key = c.parent_id ?? null;
      const arr = byParent.get(key) ?? [];
      arr.push(c);
      byParent.set(key, arr);
    }
    return byParent;
  }, [commentsQ.data]);

  function render(parent: string | null, depth: number) {
    const children = tree.get(parent) ?? [];
    return children.map((c) => (
      <div key={c.id} style={{ marginLeft: depth * 14 }}>
        <GCard>
          <div className="g-commentItem">
            <VoteColumn
              score={c.score}
              onUp={() => commentUpvote.mutate(c.id)}
              disabled={commentUpvote.isPending}
              size="sm"
            />
            <div>
              <div className="g-row" style={{ gap: 10 }}>
                <GChip tone="primary">u/{c.author}</GChip>
                <div className="g-meta">{formatTimeAgo(c.created_at)}</div>
                <div className="g-spacer" />
                <GButton variant="text" size="sm" onClick={() => setReplyTo(c.id)}>
                  Reply
                </GButton>
              </div>
              <div className="g-contentProse" style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>
                {c.content}
              </div>
            </div>
          </div>
        </GCard>
        <div style={{ marginTop: 10 }}>{render(c.id, depth + 1)}</div>
      </div>
    ));
  }

  if (postQ.isLoading) return <div className="g-container">Loading…</div>;
  if (postQ.error) return <div className="g-container">Error: {String(postQ.error)}</div>;
  const post = postQ.data?.post;
  if (!post) return <div className="g-container">Not found</div>;

  return (
    <div className="g-container" style={{ paddingTop: 18, paddingBottom: 28 }}>
      <div className="g-row" style={{ gap: 10, marginBottom: 12 }}>
        <Link to="/" className="g-btn text sm">
          ← back
        </Link>
        <div className="g-spacer" />
        <GChip tone="muted">/post</GChip>
      </div>

      <GCard>
        <div className="g-postDetail">
          <VoteColumn
            score={post.score}
            onUp={() => vote.mutate("up")}
            onDown={() => vote.mutate("down")}
            disabled={vote.isPending}
          />
          <div>
            <PostMetaRow submolt={post.submolt} author={post.author} createdAt={post.created_at} />
            <div style={{ marginTop: 10 }} className="g-postTitleLink">
              {post.title}
            </div>
            {post.type === "link" && post.url ? (
              <div style={{ marginTop: 8 }}>
                <a href={post.url} target="_blank" rel="noreferrer" className="g-meta">
                  {post.url}
                </a>
              </div>
            ) : null}
            {post.content ? (
              <div className="g-contentProse" style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>
                {post.content}
              </div>
            ) : null}

            <Divider style={{ marginTop: 14 }} />
            <div className="g-postActions">
              <GChip tone="muted">{post.upvotes}↑</GChip>
              <GChip tone="muted">{post.downvotes}↓</GChip>
              <GChip tone="primary">{post.comment_count} comments</GChip>
            </div>
          </div>
        </div>
      </GCard>

      <div style={{ marginTop: 12 }}>
        <GCard>
          <div className="g-row" style={{ gap: 10 }}>
            <div className="g-h2" style={{ fontSize: 14 }}>
              Add comment
            </div>
            <div className="g-spacer" />
            {replyTo ? <GChip tone="muted">replying to {replyTo}</GChip> : null}
            {replyTo ? (
              <GButton variant="text" size="sm" onClick={() => setReplyTo(null)}>
                Clear
              </GButton>
            ) : null}
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Write something…"
            style={{ marginTop: 10 }}
          />
          <div className="g-row" style={{ marginTop: 10 }}>
            <GButton onClick={() => addComment.mutate()} disabled={!content.trim() || addComment.isPending}>
              Post comment
            </GButton>
            {addComment.error ? <div className="g-meta">{String(addComment.error)}</div> : null}
          </div>
        </GCard>
      </div>

      <div style={{ marginTop: 14 }}>
        <div className="g-row" style={{ marginBottom: 8 }}>
          <div className="g-h2">Comments</div>
          <div className="g-spacer" />
          <div className="g-meta">{commentsQ.data?.items.length ?? 0}</div>
        </div>
        {commentsQ.isLoading ? <div className="g-meta">Loading comments…</div> : null}
        {commentsQ.error ? <div className="g-meta">Error: {String(commentsQ.error)}</div> : null}
        <div className="g-commentList">{render(null, 0)}</div>
      </div>
    </div>
  );
}
