import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../api";
import { PostDetail } from "../moltbook-google/components/PostDetail";
import { Header } from "../moltbook-google/components/Header";
import { toGooglePostDetail, buildCommentTree } from "../moltbook-google/adapters";
import { formatTimeAgo } from "../lib/time";
import type { GoogleComment } from "../moltbook-google/types";

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

const avatarColors = ["bg-blue-600", "bg-green-600", "bg-red-500", "bg-yellow-500", "bg-purple-600", "bg-teal-600"];
function pickColor(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return avatarColors[h % avatarColors.length];
}

export function PostPage() {
  const { id } = useParams();
  const postId = id || "";
  const navigate = useNavigate();

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

  const vmPost = postQ.data?.post ? toGooglePostDetail(postQ.data.post) : null;

  const flatComments: GoogleComment[] = useMemo(() => {
    const items = commentsQ.data?.items ?? [];
    return items.map((c) => ({
      id: c.id,
      parent_id: c.parent_id,
      author: `u/${c.author}`,
      timeAgo: formatTimeAgo(c.created_at),
      content: c.content,
      upvotes: c.upvotes,
      avatarColor: pickColor(c.author)
    }));
  }, [commentsQ.data]);

  const tree = useMemo(() => buildCommentTree(flatComments), [flatComments]);

  if (postQ.isLoading) {
    return <div className="min-h-screen bg-[#f8f9fa]"><Header /><main className="max-w-7xl mx-auto px-4 py-10 text-sm text-gray-600">Loading…</main></div>;
  }
  if (postQ.error || !vmPost) {
    return <div className="min-h-screen bg-[#f8f9fa]"><Header /><main className="max-w-7xl mx-auto px-4 py-10 text-sm text-gray-600">Failed to load post.</main></div>;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-google-text selection:bg-google-blue/20">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <PostDetail
          post={vmPost}
          comments={tree}
          onBack={() => navigate("/")}
          onUpvotePost={() => vote.mutate("up")}
          onDownvotePost={() => vote.mutate("down")}
          onUpvoteComment={(commentId) => commentUpvote.mutate(commentId)}
        />
      </main>
    </div>
  );
}
