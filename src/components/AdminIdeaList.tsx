"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Edit2, ToggleLeft, ToggleRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminIdeaList({ onEdit }: { onEdit: (idea: any) => void }) {
  const ideas = useQuery(api.ideas.listAll);
  const updateIdea = useMutation(api.ideas.update);

  if (!ideas) return <div className="text-tertiary animate-pulse text-xs uppercase tracking-widest">Scanning inventory...</div>;

  return (
    <div className="space-y-3">
      {ideas.map((idea) => (
        <motion.div 
          key={idea._id} 
          whileHover={{ rotate: 0.5, y: -1 }}
          className="asymmetric-card bg-surface-container-lowest p-4 border border-outline-variant flex items-start justify-between gap-3 group transition-shadow hover:shadow-md"
        >
          <div className="flex-1 min-w-0">
            <h4 className="font-display text-sm text-on-surface group-hover:text-primary transition-colors truncate uppercase tracking-tight">
              {idea.title}
            </h4>
            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-tighter truncate mt-0.5">
              {idea.subtitle}
            </p>
            <p className="text-[10px] text-tertiary line-clamp-2 leading-relaxed mt-1.5 font-medium">
              {idea.pitch}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => updateIdea({ 
                id: idea._id, 
                title: idea.title, 
                subtitle: idea.subtitle,
                pitch: idea.pitch, 
                features: idea.features, 
                isActive: !idea.isActive 
              })}
              className={`p-1.5 rounded-sm transition-colors ${idea.isActive ? 'text-primary hover:bg-primary/5' : 'text-tertiary hover:bg-black/5'}`}
              title={idea.isActive ? "Deactivate" : "Activate"}
            >
              {idea.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
            </button>
            <button 
              onClick={() => onEdit(idea)}
              className="p-1.5 text-tertiary hover:text-on-surface hover:bg-black/5 rounded-sm transition-colors"
            >
              <Edit2 size={16} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
