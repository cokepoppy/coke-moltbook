import { formatTimeAgo } from "../lib/time";
import type { GoogleFeedItem, GooglePostDetail, GoogleComment } from "./types";

export function toGoogleFeedItem(p: {
  id: string;
  title: string;
  excerpt: string | null;
  submolt: string;
  author: string;
  upvotes: number;
  comment_count: number;
  created_at: string;
  score?: number;
}): GoogleFeedItem {
  return {
    id: p.id,
    submoit: `m/${p.submolt}`,
    author: `u/${p.author}`,
    timeAgo: formatTimeAgo(p.created_at),
    title: p.title,
    content: p.excerpt,
    upvotes: p.upvotes,
    comments: p.comment_count,
    isHot: (p.score ?? 0) > 50
  };
}

export function toGooglePostDetail(p: {
  id: string;
  title: string;
  content: string | null;
  submolt: string;
  author: string;
  upvotes: number;
  comment_count: number;
  created_at: string;
  score?: number;
}): GooglePostDetail {
  return {
    id: p.id,
    submoit: `m/${p.submolt}`,
    author: `u/${p.author}`,
    timeAgo: formatTimeAgo(p.created_at),
    title: p.title,
    content: p.content,
    upvotes: p.upvotes,
    comments: p.comment_count,
    isHot: (p.score ?? 0) > 50
  };
}

export function buildCommentTree(items: GoogleComment[]): GoogleComment[] {
  const byId = new Map<string, GoogleComment>();
  for (const c of items) byId.set(c.id, { ...c, children: [] });

  const roots: GoogleComment[] = [];
  for (const c of byId.values()) {
    if (c.parent_id && byId.has(c.parent_id)) {
      byId.get(c.parent_id)!.children!.push(c);
    } else {
      roots.push(c);
    }
  }
  return roots;
}
