"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { X, ChevronRight, User, Lightbulb, FileText, Ban, Search, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RealTimeFeedbackTable() {
  const feedbacks = useQuery(api.feedback.listAll);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  if (!feedbacks) {
    return <div className="text-white/20 animate-pulse text-[8px] font-black uppercase tracking-[0.3em]">Compiling...</div>;
  }

  return (
    <div className="relative flex-1 flex flex-col min-h-0">
      {/* Mobile Card Feed */}
      <div className="md:hidden space-y-6 pb-24">
        {feedbacks.map((f) => (
          <motion.div
            key={f._id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFeedback(f)}
            className="bg-surface-container-low p-6 border-l-[6px] border-white/5 active:bg-surface-container-high transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="monolith-label text-[7px] mb-1 tracking-[0.2em]">Source: {f.expertName}</div>
                <h4 className="font-display font-black text-lg text-white uppercase tracking-tighter leading-none italic">
                  {f.ideaTitle}
                </h4>
              </div>
              <div className={`px-2 py-0.5 border-none text-[8px] font-black uppercase tracking-[0.2em] ${f.vote ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-white/20'}`}>
                {f.vote ? 'VALID' : 'RISK'}
              </div>
            </div>
            
            <div className="text-[10px] text-white/40 font-black uppercase tracking-tight line-clamp-2 mb-4 leading-tight">
              {f.reasonsForFailure || "NO FAILURE RISKS DOCUMENTED."}
            </div>

            <div className="flex items-center gap-2 text-primary font-black text-[8px] uppercase tracking-[0.3em]">
              Access Protocol <ArrowRight size={10} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-surface-container-low border-none shadow-xl overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-highest text-white/20 text-[8px] font-black uppercase tracking-[0.4em]">
              <tr>
                <th className="px-6 py-4">Expert</th>
                <th className="px-6 py-4">Concept</th>
                <th className="px-6 py-4">Consensus</th>
                <th className="px-6 py-4">Failure Risks</th>
                <th className="px-6 py-4 text-right">Briefing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {feedbacks.map((f) => (
                <tr 
                  key={f._id} 
                  onClick={() => setSelectedFeedback(f)}
                  className={`hover:bg-surface-container-high transition-all group cursor-pointer ${selectedFeedback?._id === f._id ? 'bg-surface-container-high' : ''}`}
                >
                  <td className="px-6 py-4 font-black text-white uppercase tracking-tight whitespace-nowrap">{f.expertName}</td>
                  <td className="px-6 py-4 font-display font-black text-primary uppercase tracking-tighter italic whitespace-nowrap">{f.ideaTitle}</td>
                  <td className="px-6 py-4">
                    {f.vote ? (
                      <span className="inline-flex items-center px-2 py-0.5 bg-primary text-on-primary font-black uppercase text-[7px] tracking-widest">
                        Validated
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 bg-surface-container-highest text-white/20 font-black uppercase text-[7px] tracking-widest">
                        Risks
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 max-w-[200px] truncate text-white/40 font-black uppercase tracking-tight text-[9px]" title={f.reasonsForFailure}>
                    {f.reasonsForFailure || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary opacity-20 group-hover:opacity-100 transition-opacity p-2">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {feedbacks.length === 0 && (
        <div className="p-16 text-center text-white/10 font-black text-[9px] uppercase tracking-[0.4em] bg-surface-container-low border-none">
          Awaiting Evaluation Data...
        </div>
      )}

      {/* Intelligence Drawer (Compact Monolith Style) */}
      <AnimatePresence>
        {selectedFeedback && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeedback(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-screen w-full max-w-lg bg-surface-container-low z-50 shadow-2xl flex flex-col border-l-4 border-primary"
            >
              <div className="h-24 px-8 flex items-center justify-between border-b border-white/5 bg-surface-container shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center shadow-lg">
                    <FileText className="text-on-primary" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-black text-white uppercase tracking-tighter italic leading-none">Intelligence <span className="text-primary not-italic">Briefing</span></h2>
                    <p className="monolith-label mt-1 mb-0 text-[7px]">Ref: {selectedFeedback._id.slice(-4).toUpperCase()}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="p-2 hover:bg-white/5 transition-colors text-white/20 hover:text-white"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-surface-container p-6 border-l-[4px] border-white/10">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <User size={12} />
                      <span className="text-[8px] font-black uppercase tracking-[0.3em]">Expert</span>
                    </div>
                    <div className="text-lg font-display font-black text-white uppercase tracking-tight italic">{selectedFeedback.expertName}</div>
                  </div>
                  <div className="bg-surface-container p-6 border-l-[4px] border-primary">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <Lightbulb size={12} />
                      <span className="text-[8px] font-black uppercase tracking-[0.3em]">Subject</span>
                    </div>
                    <div className="text-lg font-display font-black text-white uppercase tracking-tight italic">{selectedFeedback.ideaTitle}</div>
                  </div>
                </div>

                <div className={`p-8 border-none ${selectedFeedback.vote ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                  <div className={`text-[8px] font-black uppercase tracking-[0.3em] mb-1.5 ${selectedFeedback.vote ? 'text-on-primary-container' : 'text-white/20'}`}>Verdict</div>
                  <div className={`text-4xl font-display font-black tracking-tighter uppercase leading-none ${selectedFeedback.vote ? 'text-on-primary' : 'text-primary'}`}>
                    {selectedFeedback.vote ? 'VALIDATED' : 'CRITICAL RISKS'}
                  </div>
                </div>

                <div className="space-y-12 pb-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                      <Ban size={16} />
                      <h4 className="text-[9px] font-black uppercase tracking-[0.4em]">01. FAILURE ANALYSIS</h4>
                    </div>
                    <div className="text-base leading-tight text-white font-black uppercase tracking-tighter border-l-2 border-white/10 pl-6 py-1">
                      {selectedFeedback.reasonsForFailure || "NO FAILURE RISKS DOCUMENTED."}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                      <Search size={16} />
                      <h4 className="text-[9px] font-black uppercase tracking-[0.4em]">02. MARKET DISRUPTION</h4>
                    </div>
                    <div className="text-base leading-tight text-white font-black uppercase tracking-tighter border-l-2 border-white/10 pl-6 py-1">
                      {selectedFeedback.existingSolutions || "NO EXISTING SOLUTIONS DOCUMENTED."}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                      <HelpCircle size={16} />
                      <h4 className="text-[9px] font-black uppercase tracking-[0.4em]">03. OPERATIONAL HURDLES</h4>
                    </div>
                    <div className="text-base leading-tight text-on-primary-container bg-primary p-8 font-black uppercase tracking-tighter">
                      {selectedFeedback.hiddenHurdles || "NO HIDDEN HURDLES IDENTIFIED."}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 mt-auto bg-surface-container">
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="secondary-button w-full py-4"
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
