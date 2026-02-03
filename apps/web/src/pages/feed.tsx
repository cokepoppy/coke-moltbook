import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiFetch, HttpError } from "../api";

type FeedItem = {
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

type FeedResp = { items: FeedItem[]; next_cursor: string | null };

export function FeedPage() {
  const sort = new URLSearchParams(location.search).get("sort") || "hot";

  const q = useInfiniteQuery({
    queryKey: ["feed", sort],
    queryFn: async ({ pageParam }) => {
      const cursor = typeof pageParam === "string" ? `&cursor=${encodeURIComponent(pageParam)}` : "";
      return apiFetch<FeedResp>(`/feed?sort=${encodeURIComponent(sort)}&limit=25${cursor}`);
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined
  });

  const items = q.data?.pages.flatMap((p) => p.items) ?? [];
  const error =
    q.error instanceof HttpError
      ? `${q.error.message} (set API key in Settings or Register)`
      : q.error
        ? String(q.error)
        : null;

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: 12 }}>
        <div className="pill">/feed</div>
        <div className="spacer" />
        <label className="row" style={{ gap: 8 }}>
          <span className="muted">Sort</span>
          <select
            value={sort}
            onChange={(e) => {
              const s = e.target.value;
              const url = new URL(location.href);
              url.searchParams.set("sort", s);
              history.replaceState(null, "", url.toString());
              q.refetch();
            }}
            style={{ width: 160 }}
          >
            <option value="hot">hot</option>
            <option value="new">new</option>
            <option value="top">top</option>
          </select>
        </label>
      </div>

      {error ? (
        <div className="card">{error}</div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((p) => (
            <div key={p.id} className="card">
              <div className="row" style={{ gap: 10 }}>
                <div className="pill">m/{p.submolt}</div>
                <div className="pill">u/{p.author}</div>
                <div className="spacer" />
                <div className="pill">{p.score} score</div>
                <div className="pill">{p.comment_count} comments</div>
              </div>
              <div style={{ marginTop: 10 }}>
                <Link to={`/post/${p.id}`} className="title">
                  {p.title}
                </Link>
              </div>
            </div>
          ))}

          <button
            className="primary"
            disabled={!q.hasNextPage || q.isFetchingNextPage}
            onClick={() => q.fetchNextPage()}
            style={{ width: 200 }}
          >
            {q.isFetchingNextPage ? "Loading..." : q.hasNextPage ? "Load more" : "No more"}
          </button>
        </div>
      )}
    </div>
  );
}
