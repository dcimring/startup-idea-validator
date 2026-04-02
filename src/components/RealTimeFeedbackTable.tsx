"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ThumbsUp, ThumbsDown, MessageSquare, X, ChevronRight, User, Lightbulb, AlertTriangle, MessageCircle, FileText, Ban, Search, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RealTimeFeedbackTable() {
  const feedbacks = useQuery(api.feedback.listAll);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  if (!feedbacks) {
    return <div className="text-tertiary animate-pulse text-xs uppercase tracking-widest">Compiling matrix...</div>;
  }

  return (
    <div className="relative flex-1 flex flex-col min-h-0">
      {/* Mobile Card Feed */}
      <div className="md:hidden space-y-4 pb-24">
        {feedbacks.map((f) => (
          <motion.div
            key={f._id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFeedback(f)}
            className="bg-surface-container-lowest p-6 border border-outline-variant asymmetric-card shadow-sm active:bg-surface-container transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-tertiary mb-1">Source: {f.expertName}</div>
                <h4 className="font-display font-bold text-on-surface uppercase tracking-tight italic">
                  {f.ideaTitle}
                </h4>
              </div>
              <div className={`px-2 py-0.5 border text-[8px] font-bold uppercase tracking-[0.1em] ${f.vote ? 'border-tertiary/20 text-tertiary' : 'border-primary/20 text-primary'}`}>
                {f.vote ? 'VALID' : 'RISK'}
              </div>
            </div>
            
            <div className="text-xs text-on-surface/60 font-medium italic line-clamp-2 mb-4 leading-relaxed">
              {f.reasonsForFailure || "No failure risks documented."}
            </div>

            <div className="flex items-center gap-2 text-primary font-bold text-[8px] uppercase tracking-[0.2em]">
              View Full Briefing <ChevronRight size={10} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-surface-container-lowest border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container text-tertiary text-[10px] font-bold uppercase tracking-[0.2em]">
              <tr>
                <th className="px-6 py-4">Expert</th>
                <th className="px-6 py-4">Concept</th>
                <th className="px-6 py-4">Consensus</th>
                <th className="px-6 py-4">Failure Risks</th>
                <th className="px-6 py-4">Market State</th>
                <th className="px-6 py-4 text-right">Draft</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {feedbacks.map((f) => (
                <tr 
                  key={f._id} 
                  onClick={() => setSelectedFeedback(f)}
                  className={`hover:bg-surface-container transition-all group cursor-pointer ${selectedFeedback?._id === f._id ? 'bg-surface-container' : ''}`}
                >
                  <td className="px-6 py-4 font-bold text-on-surface whitespace-nowrap">{f.expertName}</td>
                  <td className="px-6 py-4 italic font-display text-primary whitespace-nowrap">{f.ideaTitle}</td>
                  <td className="px-6 py-4">
                    {f.vote ? (
                      <span className="flex items-center gap-1.5 text-tertiary font-bold uppercase text-[10px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-tertiary" /> Valid
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-primary font-bold uppercase text-[10px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Concerns
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 max-w-[200px] truncate text-on-surface/70 font-medium italic" title={f.reasonsForFailure}>
                    {f.reasonsForFailure || "-"}
                  </td>
                  <td className="px-6 py-4 max-w-[200px] truncate text-on-surface/70 font-medium italic" title={f.existingSolutions}>
                    {f.existingSolutions || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary opacity-0 group-hover:opacity-100 transition-opacity p-2">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {feedbacks.length === 0 && (
        <div className="p-12 text-center text-tertiary italic text-xs uppercase tracking-widest bg-surface-container-lowest border border-outline-variant">
          Awaiting expert evaluation data...
        </div>
      )}

      {/* Intelligence Drawer (Vellum Style) */}
      <AnimatePresence>
        {selectedFeedback && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeedback(null)}
              className="fixed inset-0 bg-on-surface/5 backdrop-blur-sm z-40"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-screen w-full max-w-lg vellum-drawer z-50 shadow-2xl flex flex-col"
            >
              <div className="h-24 px-8 flex items-center justify-between border-b border-outline-variant shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center border border-primary/20">
                    <FileText className="text-primary" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-display text-on-surface">Briefing <span className="text-primary italic">Record</span></h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary">Strategic Appraisal</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="p-3 hover:bg-black/5 rounded-full transition-colors text-tertiary"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-lowest p-4 asymmetric-card border border-outline-variant">
                    <div className="flex items-center gap-2 mb-2 text-primary opacity-60">
                      <User size={12} />
                      <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Contributor</span>
                    </div>
                    <div className="text-lg font-display font-bold">{selectedFeedback.expertName}</div>
                  </div>
                  <div className="bg-surface-container-lowest p-4 asymmetric-card border border-outline-variant">
                    <div className="flex items-center gap-2 mb-2 text-tertiary opacity-60">
                      <Lightbulb size={12} />
                      <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Subject</span>
                    </div>
                    <div className="text-lg font-display font-bold italic">{selectedFeedback.ideaTitle}</div>
                  </div>
                </div>

                <div className={`p-6 asymmetric-card border ${selectedFeedback.vote ? 'bg-tertiary/5 border-tertiary/20' : 'bg-primary/5 border-primary/20'}`}>
                  <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-tertiary mb-1">Consensus Verdict</div>
                  <div className={`text-2xl font-display font-black tracking-tighter ${selectedFeedback.vote ? 'text-tertiary' : 'text-primary'}`}>
                    {selectedFeedback.vote ? 'VALIDATED' : 'CRITICAL CONCERNS'}
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-3 relative">
                    <div className="flex items-center gap-2 text-primary">
                      <Ban size={14} />
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">01. Why will it not work?</h4>
                    </div>
                    <div className="text-sm leading-relaxed text-on-surface font-medium border-l border-outline-variant pl-6 py-1 italic">
                      {selectedFeedback.reasonsForFailure || "No failure risks documented."}
                    </div>
                  </div>

                  <div className="space-y-3 relative">
                    <div className="flex items-center gap-2 text-tertiary">
                      <Search size={14} />
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">02. Current Market Solutions</h4>
                    </div>
                    <div className="text-sm leading-relaxed text-on-surface font-medium border-l border-outline-variant pl-6 py-1 italic">
                      {selectedFeedback.existingSolutions || "No existing solutions documented."}
                    </div>
                  </div>

                  <div className="space-y-3 relative">
                    <div className="flex items-center gap-2 text-on-surface">
                      <HelpCircle size={14} />
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">03. Hidden Hurdles</h4>
                    </div>
                    <div className="text-sm leading-relaxed text-on-surface bg-surface-container p-6 border border-outline-variant shadow-inner font-medium">
                      {selectedFeedback.hiddenHurdles || "No hidden hurdles identified."}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-outline-variant mt-auto bg-surface-container-low">
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="ghost-button w-full font-bold uppercase text-[10px] tracking-widest"
                >
                  Close Briefing
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
