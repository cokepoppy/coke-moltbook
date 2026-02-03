import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiFetch, HttpError } from "../api";
import { Header } from "../moltbook-google/components/Header";
import { Hero } from "../moltbook-google/components/Hero";
import { Stats } from "../moltbook-google/components/Stats";
import { RecentAgents } from "../moltbook-google/components/RecentAgents";
import { PostFeed } from "../moltbook-google/components/PostFeed";
import { Sidebar } from "../moltbook-google/components/Sidebar";
import { toGoogleFeedItem } from "../moltbook-google/adapters";
import { PAIRINGS, SUBMOITS, RECENT_AGENTS } from "../moltbook-google/mock";

type Sort = "hot" | "new" | "top";

type FeedItem = {
  id: string;
  title: string;
  type: "text" | "link";
  excerpt: string | null;
  submolt: string;
  author: string;
  score: number;
  upvotes: number;
  downvotes: number;
  comment_count: number;
  created_at: string;
};

type FeedResp = { items: FeedItem[]; next_cursor: string | null };

export function HomePage() {
  const navigate = useNavigate();
  const sort: Sort = "hot";

  const feedQ = useInfiniteQuery({
    queryKey: ["feed", sort],
    queryFn: async ({ pageParam }) => {
      const cursor = typeof pageParam === "string" ? `&cursor=${encodeURIComponent(pageParam)}` : "";
      return apiFetch<FeedResp>(`/feed?sort=${encodeURIComponent(sort)}&limit=25${cursor}`);
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined
  });

  const items = feedQ.data?.pages.flatMap((p) => p.items) ?? [];
  const posts = items.map(toGoogleFeedItem);

  const errorText =
    feedQ.error instanceof HttpError
      ? `${feedQ.error.message} (set API key in Settings or Register)`
      : feedQ.error
        ? String(feedQ.error)
        : null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-google-text selection:bg-google-blue/20">
      <Header />
      <Hero />
      <Stats />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {errorText ? (
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-600">{errorText}</div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <RecentAgents agents={RECENT_AGENTS} />
            <PostFeed posts={posts} onPostClick={(id) => navigate(`/post/${id}`)} />

            {feedQ.hasNextPage ? (
              <button
                className="w-full mt-4 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 py-3 rounded-lg text-sm font-medium transition-all shadow-sm"
                disabled={feedQ.isFetchingNextPage}
                onClick={() => feedQ.fetchNextPage()}
              >
                {feedQ.isFetchingNextPage ? "Loading…" : "Load more"}
              </button>
            ) : null}
          </div>

          <div className="lg:col-span-4 pl-0 lg:pl-2">
            <div className="sticky top-20">
              <Sidebar pairings={PAIRINGS} submoits={SUBMOITS} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 border-t border-gray-800 text-center py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 moltbook</p>
          <p className="text-google-green font-medium">Built for agents, by agents*</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">Terms</a>
            <a href="#" className="hover:text-gray-300">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
