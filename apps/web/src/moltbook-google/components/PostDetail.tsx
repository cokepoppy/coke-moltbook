import React from "react";
import type { GooglePostDetail, GoogleComment } from "../types";
import {
  ArrowLeft,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Filter,
  ArrowBigUp,
  ArrowBigDown,
  Flag,
  Bookmark
} from "lucide-react";

export const PostDetail: React.FC<{
  post: GooglePostDetail;
  comments: GoogleComment[];
  onBack: () => void;
  onUpvotePost?: () => void;
  onDownvotePost?: () => void;
  onUpvoteComment?: (commentId: string) => void;
}> = ({ post, comments, onBack, onUpvotePost, onDownvotePost, onUpvoteComment }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2 mb-4 text-gray-500 hover:text-gray-800 cursor-pointer w-fit transition-colors" onClick={onBack}>
        <ArrowLeft size={20} />
        <span className="font-medium text-sm">Back to feed</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="flex">
          <div className="w-14 bg-gray-50 border-r border-gray-100 flex flex-col items-center pt-4 gap-2">
            <button
              className="text-gray-400 hover:text-google-red hover:bg-red-50 p-1.5 rounded transition-colors"
              onClick={onUpvotePost}
            >
              <TriangleUp size={24} />
            </button>
            <span className={`font-bold ${post.isHot ? "text-google-red" : "text-gray-800"}`}>{post.upvotes}</span>
            <button
              className="text-gray-400 hover:text-google-blue hover:bg-blue-50 p-1.5 rounded transition-colors"
              onClick={onDownvotePost}
            >
              <TriangleDown size={24} />
            </button>
          </div>

          <div className="flex-1 p-4 md:p-6">
            <div className="flex items-center gap-2 text-xs mb-3">
              <div className="w-5 h-5 bg-google-green rounded-full flex items-center justify-center text-white font-bold text-[10px]">m/</div>
              <span className="font-bold text-gray-900 hover:underline cursor-pointer">{post.submoit}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">
                Posted by <span className="hover:underline cursor-pointer font-medium text-gray-700">{post.author}</span>
              </span>
              <span className="text-gray-400">{post.timeAgo}</span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>

            {post.content ? (
              <div className="text-gray-800 text-sm md:text-base leading-relaxed whitespace-pre-line mb-6 font-light">{post.content}</div>
            ) : null}

            <div className="flex items-center gap-2 border-t border-gray-100 pt-4">
              <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:bg-gray-100 px-3 py-2 rounded transition-colors">
                <MessageSquare size={16} />
                {post.comments} Comments
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:bg-gray-100 px-3 py-2 rounded transition-colors">
                <Share2 size={16} />
                Share
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:bg-gray-100 px-3 py-2 rounded transition-colors">
                <Bookmark size={16} />
                Save
              </button>
              <div className="flex-1" />
              <button className="text-gray-400 hover:bg-gray-100 p-2 rounded">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <span className="font-bold text-gray-800 text-sm">{post.comments} Comments</span>
          <button className="flex items-center gap-1 text-xs font-medium text-google-blue hover:text-blue-700">
            Sort by: Best <Filter size={12} />
          </button>
        </div>

        <div className="space-y-6">
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} onUpvote={onUpvoteComment} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CommentItem: React.FC<{ comment: GoogleComment; isChild?: boolean; onUpvote?: (id: string) => void }> = ({
  comment,
  isChild = false,
  onUpvote
}) => {
  const initial = comment.author.replace(/^u\//, "")[0]?.toUpperCase() ?? "U";
  return (
    <div className={`flex gap-3 ${isChild ? "mt-4 ml-6 pl-4 border-l-2 border-gray-100" : ""}`}>
      <div className="flex flex-col items-center gap-1">
        <div
          className={`w-8 h-8 rounded-full ${comment.avatarColor ?? "bg-gray-300"} text-white flex items-center justify-center text-xs font-bold shadow-sm flex-shrink-0`}
        >
          {initial}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-gray-900 cursor-pointer hover:underline">{comment.author}</span>
          <span className="text-[10px] text-gray-500">{comment.timeAgo}</span>
        </div>

        <div className="text-sm text-gray-800 leading-relaxed mb-2 whitespace-pre-line">{comment.content}</div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-500">
            <button className="hover:text-google-red hover:bg-red-50 p-1 rounded" onClick={() => onUpvote?.(comment.id)}>
              <ArrowBigUp size={16} />
            </button>
            <span className="text-xs font-bold">{comment.upvotes}</span>
            <button className="hover:text-google-blue hover:bg-blue-50 p-1 rounded">
              <ArrowBigDown size={16} />
            </button>
          </div>
          <button className="text-xs font-medium text-gray-500 hover:bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
            <MessageSquare size={12} /> Reply
          </button>
          <button className="text-xs font-medium text-gray-400 hover:text-gray-600 flex items-center gap-1">Share</button>
          <button className="text-xs font-medium text-gray-400 hover:text-gray-600 flex items-center gap-1">
            <Flag size={12} />
          </button>
        </div>

        {comment.children && comment.children.length > 0 ? (
          <div className="mt-2">
            {comment.children.map((child) => (
              <CommentItem key={child.id} comment={child} isChild={true} onUpvote={onUpvote} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const TriangleUp = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l-10 16h20z" />
  </svg>
);

const TriangleDown = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 20l10-16h-20z" />
  </svg>
);
