"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion } from "framer-motion";
import { Loader2, MessageSquare, AlertCircle } from "lucide-react";

export default function ExpertAdvisoryList() {
  const generalFeedback = useQuery(api.feedback.listGeneral);

  if (!generalFeedback) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6 opacity-30">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Decrypting Strategic Advisories...</p>
      </div>
    );
  }

  if (generalFeedback.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6 border-2 border-dashed border-white/5 opacity-30">
        <MessageSquare size={32} />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">No Strategic Advisories Recorded</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24">
      {generalFeedback.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 bg-surface-container/20 p-8 md:p-10 border-l-[8px] border-white/5 hover:border-primary transition-all group ambient-shadow"
        >
          {/* Source Info */}
          <div className="flex flex-col gap-4">
            <div className="monolith-label text-[8px] opacity-40">ADVISORY_SOURCE</div>
            <h4 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors">
              {item.expertName}
            </h4>
            <div className="mt-auto hidden lg:block">
              <div className="text-[10px] font-black text-white/10 uppercase tracking-[0.2em] leading-relaxed">
                Strategic Intelligence <br />
                Report // REF_{item._id.slice(-6).toUpperCase()}
              </div>
            </div>
          </div>

          {/* Strategic Intel */}
          <div className="space-y-10">
            {item.relatedIdeas && (
              <div className="bg-surface-container-high p-8 border-l-[12px] border-primary/20 hover:border-primary transition-all ambient-shadow">
                <div className="flex items-center gap-3 monolith-label text-[9px] mb-4">
                  <AlertCircle size={14} className="text-primary" /> CORE PAIN POINT
                </div>
                <p className="text-xl md:text-2xl font-display font-black text-white uppercase italic tracking-tighter leading-tight">
                  "{item.relatedIdeas}"
                </p>
              </div>
            )}

            {item.generalFeedback && (
              <div className="bg-surface-container-highest/40 p-8 border-l-[12px] border-white/5 ambient-shadow">
                <div className="monolith-label text-[9px] mb-4">GENERAL DIRECTIVES</div>
                <p className="text-sm md:text-base font-black uppercase tracking-tight text-white/40 leading-relaxed max-w-4xl">
                  {item.generalFeedback}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
