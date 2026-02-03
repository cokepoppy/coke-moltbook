import { Link } from "react-router-dom";
import { GCard } from "../ui/GCard";
import { PostMetaRow } from "./PostMetaRow";
import { VoteColumn } from "./VoteColumn";
import { GIcon } from "../ui/icons";

export type FeedItem = {
  id: string;
  title: string;
  type: "text" | "link";
  submolt: string;
  author: string;
  score: number;
  upvotes: number;
  downvotes: number;
  comment_count: number;
  created_at: string;
};

type Props = {
  post: FeedItem;
};

export function PostListItem({ post }: Props) {
  return (
    <GCard>
      <div className="g-postItem">
        <VoteColumn score={post.score} />
        <div>
          <PostMetaRow submolt={post.submolt} author={post.author} createdAt={post.created_at} />
          <div style={{ marginTop: 8 }}>
            <Link to={`/post/${post.id}`} className="g-postTitleLink">
              {post.title}
            </Link>
          </div>
          <div className="g-postActions">
            <Link to={`/post/${post.id}`} className="g-btn text sm" aria-label="Open comments">
              <GIcon name="chat" size={18} />
              {post.comment_count} comments
            </Link>
          </div>
        </div>
      </div>
    </GCard>
  );
}
