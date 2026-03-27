"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ThumbsUp, ThumbsDown, MessageSquare, X, ChevronRight, User, Lightbulb, AlertTriangle, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RealTimeFeedbackTable() {
  const feedbacks = useQuery(api.feedback.listAll);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  if (!feedbacks) {
    return <div className="text-on-surface-variant animate-pulse">Loading feedback matrix...</div>;
  }

  return (
    <div className="relative flex-1 flex flex-col min-h-0">
      <div className="bg-surface-container-low rounded-xl overflow-hidden border border-white/5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-highest/50 text-on-surface-variant text-xs font-extrabold uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Expert</th>
                <th className="px-6 py-4">Idea</th>
                <th className="px-6 py-4">Vote</th>
                <th className="px-6 py-4">Likes</th>
                <th className="px-6 py-4">Concerns</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {feedbacks.map((f) => (
                <tr 
                  key={f._id} 
                  onClick={() => setSelectedFeedback(f)}
                  className={`hover:bg-white/[0.04] transition-all group cursor-pointer ${selectedFeedback?._id === f._id ? 'bg-white/[0.04]' : ''}`}
                >
                  <td className="px-6 py-4 font-bold text-on-surface whitespace-nowrap">{f.expertName}</td>
                  <td className="px-6 py-4 italic font-serif text-on-surface-variant group-hover:text-on-surface whitespace-nowrap">{f.ideaTitle}</td>
                  <td className="px-6 py-4">
                    {f.vote ? (
                      <span className="flex items-center gap-1 text-green-400">
                        <ThumbsUp size={14} /> Yes
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400">
                        <ThumbsDown size={14} /> No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 max-w-[200px] truncate text-on-surface-variant" title={f.likeFeedback}>
                    {f.likeFeedback || "-"}
                  </td>
                  <td className="px-6 py-4 max-w-[200px] truncate text-on-surface-variant" title={f.dislikeFeedback}>
                    {f.dislikeFeedback || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary-glow opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-primary-glow/10 rounded-lg">
                      <ChevronRight size={18} />
                    </button>
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

      {/* Intelligence Drawer */}
      <AnimatePresence>
        {selectedFeedback && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeedback(null)}
              className="fixed inset-0 bg-surface-dim/40 backdrop-blur-sm z-40"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-screen w-full max-w-lg bg-surface/80 backdrop-blur-2xl border-l border-white/10 z-50 shadow-2xl flex flex-col"
            >
              <div className="h-24 px-8 flex items-center justify-between border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-glow/10 rounded-xl flex items-center justify-center border border-primary-glow/20">
                    <MessageCircle className="text-primary-glow" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-on-surface">Intelligence <span className="text-primary-glow font-serif italic">Briefing</span></h2>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">Expert Evaluation Report</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="p-3 hover:bg-white/5 rounded-full transition-colors text-on-surface-variant"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {/* Header Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass p-4 rounded-2xl border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-primary-glow">
                      <User size={14} />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest">Expert</span>
                    </div>
                    <div className="text-lg font-bold">{selectedFeedback.expertName}</div>
                  </div>
                  <div className="glass p-4 rounded-2xl border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-secondary-glow">
                      <Lightbulb size={14} />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest">Concept</span>
                    </div>
                    <div className="text-lg font-bold font-serif italic">{selectedFeedback.ideaTitle}</div>
                  </div>
                </div>

                {/* Vote Status */}
                <div className={`p-6 rounded-3xl border flex items-center justify-between ${selectedFeedback.vote ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-1">Expert Consensus</div>
                    <div className={`text-2xl font-black ${selectedFeedback.vote ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedFeedback.vote ? 'VALIDATED (YES)' : 'CONCERNS (NO)'}
                    </div>
                  </div>
                  {selectedFeedback.vote ? <ThumbsUp size={48} className="text-green-400/20" /> : <ThumbsDown size={48} className="text-red-400/20" />}
                </div>

                {/* Detailed Feedback */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-400">
                      <ThumbsUp size={16} />
                      <h4 className="text-xs font-extrabold uppercase tracking-widest">Strategic Strengths</h4>
                    </div>
                    <div className="text-sm leading-relaxed text-on-surface-variant bg-white/[0.02] p-4 rounded-2xl border border-white/5 italic">
                      {selectedFeedback.likeFeedback || "No specific strengths highlighted."}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertTriangle size={16} />
                      <h4 className="text-xs font-extrabold uppercase tracking-widest">Potential Risks</h4>
                    </div>
                    <div className="text-sm leading-relaxed text-on-surface-variant bg-white/[0.02] p-4 rounded-2xl border border-white/5 italic">
                      {selectedFeedback.dislikeFeedback || "No specific risks highlighted."}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary-glow">
                      <MessageSquare size={16} />
                      <h4 className="text-xs font-extrabold uppercase tracking-widest">Additional Commentary</h4>
                    </div>
                    <div className="text-sm leading-relaxed text-on-surface bg-surface-container-low p-6 rounded-2xl border border-primary-glow/10 relative">
                      <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary-glow/10 border border-primary-glow/20 px-3 py-1 rounded-full text-[10px] font-bold text-primary-glow">STRATEGIC NOTE</div>
                      {selectedFeedback.comments || "No additional commentary provided."}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-white/5">
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="w-full bg-white/5 hover:bg-white/10 text-on-surface font-extrabold py-4 rounded-2xl transition-all"
                >
                  Return to Matrix
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
