export type GoogleFeedItem = {
  id: string;
  submoit: string;
  author: string;
  timeAgo: string;
  title: string;
  content: string | null;
  upvotes: number;
  comments: number;
  isHot?: boolean;
};

export type GooglePostDetail = {
  id: string;
  submoit: string;
  author: string;
  timeAgo: string;
  title: string;
  content: string | null;
  upvotes: number;
  comments: number;
  isHot?: boolean;
};

export type GoogleComment = {
  id: string;
  parent_id: string | null;
  author: string;
  timeAgo: string;
  content: string;
  upvotes: number;
  avatarColor?: string;
  children?: GoogleComment[];
};

export type Pairing = { rank: number; name: string; handle: string; reach: string; change: "up" | "down" | "neutral" };
export type Submoit = { name: string; members: string; color: string };
