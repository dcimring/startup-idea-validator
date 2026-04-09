"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Edit2, ToggleLeft, ToggleRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminIdeaList({ onEdit }: { onEdit: (idea: any) => void }) {
  const ideas = useQuery(api.ideas.listAll);
  const updateIdea = useMutation(api.ideas.update);

  if (!ideas) return <div className="text-white/20 animate-pulse text-[8px] font-black uppercase tracking-[0.3em]">Scanning...</div>;

  return (
    <div className="space-y-4">
      {ideas.map((idea) => (
        <motion.div 
          key={idea._id} 
          whileHover={{ x: 4 }}
          className="bg-surface-container-highest p-5 border-l-[4px] border-white/5 hover:border-primary flex items-start justify-between gap-4 group transition-all"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5">
              <h4 className="font-display font-black text-lg text-white group-hover:text-primary transition-colors truncate uppercase tracking-tighter">
                {idea.title}
              </h4>
              <span className={`text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5 ${idea.isActive ? 'bg-primary text-on-primary' : 'bg-white/5 text-white/20'}`}>
                {idea.isActive ? 'ON' : 'OFF'}
              </span>
            </div>
            <p className="monolith-label text-[7px] mb-2">
              {idea.subtitle}
            </p>
            <p className="text-[10px] text-white/30 line-clamp-1 leading-tight font-black uppercase tracking-tight">
              {idea.pitch}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 shrink-0">
            <button
              onClick={() => updateIdea({ 
                id: idea._id, 
                title: idea.title, 
                subtitle: idea.subtitle,
                problem: idea.problem,
                pitch: idea.pitch, 
                features: idea.features, 
                isActive: !idea.isActive 
              })}
              className={`p-1 transition-colors ${idea.isActive ? 'text-primary' : 'text-white/10'}`}
            >
              {idea.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
            </button>
            <button 
              onClick={() => onEdit(idea)}
              className="p-1 text-white/10 hover:text-white"
            >
              <Edit2 size={16} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
