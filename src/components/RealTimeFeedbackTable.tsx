"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

export default function RealTimeFeedbackTable() {
  const feedbacks = useQuery(api.feedback.listAll);

  if (!feedbacks) {
    return <div className="text-on-surface-variant animate-pulse">Loading feedback matrix...</div>;
  }

  return (
    <div className="glass rounded-xl overflow-hidden border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-on-surface-variant text-xs font-extrabold uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Expert</th>
              <th className="px-6 py-4">Idea</th>
              <th className="px-6 py-4">Vote</th>
              <th className="px-6 py-4">Likes</th>
              <th className="px-6 py-4">Concerns</th>
              <th className="px-6 py-4">Comments</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {feedbacks.map((f) => (
              <tr key={f._id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 font-bold text-primary-glow">{f.expertName}</td>
                <td className="px-6 py-4 italic font-serif text-on-surface group-hover:text-primary-glow">{f.ideaTitle}</td>
                <td className="px-6 py-4">
                  {f.vote ? (
                    <span className="flex items-center gap-1 text-green-400">
                      <ThumbsUp size={16} /> Like
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-400">
                      <ThumbsDown size={16} /> Dislike
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 max-w-xs truncate text-on-surface-variant" title={f.likeFeedback}>
                  {f.likeFeedback || "-"}
                </td>
                <td className="px-6 py-4 max-w-xs truncate text-on-surface-variant" title={f.dislikeFeedback}>
                  {f.dislikeFeedback || "-"}
                </td>
                <td className="px-6 py-4 max-w-xs truncate text-on-surface-variant" title={f.comments}>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={14} className="text-secondary-glow" />
                    {f.comments || "-"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {feedbacks.length === 0 && (
          <div className="p-12 text-center text-on-surface-variant italic">
            No feedback received yet. Share your expert links to begin.
          </div>
        )}
      </div>
    </div>
  );
}
