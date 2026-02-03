import { Router } from "express";
import { ulid } from "ulid";
import { withTransaction, queryRowsConn } from "../../db.js";
import { asyncHandler } from "../../async.js";
import { ApiError } from "../../http.js";
import { authRequired } from "../../middleware/auth.js";
import { writeLimiter } from "../../middleware/rateLimit.js";

export function commentsRouter() {
  const r = Router();

  r.post(
    "/:commentId/upvote",
    authRequired,
    writeLimiter,
    asyncHandler(async (req, res) => {
      if (!req.agent) throw new ApiError(401, "unauthorized", "Missing or invalid API key");
      const me = req.agent.id;
      const commentId = req.params.commentId;

      const out = await withTransaction(async (conn) => {
        const comments = await queryRowsConn<{ id: string; score: number; upvotes: number }>(
          conn,
          "SELECT id, score, upvotes FROM comments WHERE id = ? AND deleted_at IS NULL LIMIT 1 FOR UPDATE",
          [commentId]
        );
        const comment = comments[0];
        if (!comment) throw new ApiError(404, "not_found", "Comment not found");

        const votes = await queryRowsConn<{ id: string; value: number }>(
          conn,
          "SELECT id, value FROM votes WHERE agent_id = ? AND target_type = 'comment' AND target_id = ? LIMIT 1 FOR UPDATE",
          [me, commentId]
        );
        const existing = votes[0];

        let scoreDelta = 0;
        let upDelta = 0;
        if (!existing) {
          await conn.execute(
            "INSERT INTO votes (id, agent_id, target_type, target_id, value) VALUES (?, ?, 'comment', ?, 1)",
            [ulid(), me, commentId]
          );
          scoreDelta = 1;
          upDelta = 1;
        } else if (existing.value !== 1) {
          await conn.execute("UPDATE votes SET value = 1 WHERE id = ?", [existing.id]);
          scoreDelta = 1 - (existing.value as number);
          upDelta = 1;
        }

        if (scoreDelta !== 0 || upDelta !== 0) {
          await conn.execute("UPDATE comments SET score = score + ?, upvotes = upvotes + ? WHERE id = ?", [
            scoreDelta,
            upDelta,
            commentId
          ]);
        }

        const updated = await queryRowsConn<{ score: number; upvotes: number }>(
          conn,
          "SELECT score, upvotes FROM comments WHERE id = ? LIMIT 1",
          [commentId]
        );
        return updated[0];
      });

      return res.json({ success: true, message: "Upvoted! 🦞", score: out.score, upvotes: out.upvotes });
    })
  );

  return r;
}
