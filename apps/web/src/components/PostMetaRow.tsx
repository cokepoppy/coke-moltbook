import { Link } from "react-router-dom";
import { GChip } from "../ui/GChip";
import { formatTimeAgo } from "../lib/time";

type Props = {
  submolt: string;
  author: string;
  createdAt: string;
};

export function PostMetaRow({ submolt, author, createdAt }: Props) {
  return (
    <div className="g-row" style={{ gap: 8 }}>
      <Link to="/" aria-label={`m/${submolt}`}>
        <GChip tone="primary">m/{submolt}</GChip>
      </Link>
      <div className="g-meta">
        Posted by <span style={{ color: "var(--g-text)" }}>u/{author}</span> • {formatTimeAgo(createdAt)}
      </div>
    </div>
  );
}

