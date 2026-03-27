"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Edit2, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";

export default function AdminIdeaList({ onEdit }: { onEdit: (idea: any) => void }) {
  const ideas = useQuery(api.ideas.listAll);
  const updateIdea = useMutation(api.ideas.update);

  if (!ideas) return <div className="text-on-surface-variant animate-pulse">Scanning concept database...</div>;

  return (
    <div className="space-y-3">
      {ideas.map((idea) => (
        <div key={idea._id} className="glass p-4 rounded-xl border-white/5 flex items-start justify-between gap-3 group">
          <div className="flex-1 min-w-0">
            <h4 className="font-extrabold text-sm text-on-surface group-hover:text-primary-glow transition-colors truncate">
              {idea.title}
            </h4>
            <p className="text-[10px] text-on-surface-variant line-clamp-2 leading-relaxed mt-1">
              {idea.pitch}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => updateIdea({ 
                id: idea._id, 
                title: idea.title, 
                pitch: idea.pitch, 
                features: idea.features, 
                isActive: !idea.isActive 
              })}
              className={`p-1.5 rounded-lg transition-colors ${idea.isActive ? 'text-primary-glow hover:bg-primary-glow/10' : 'text-on-surface-variant hover:bg-white/5'}`}
              title={idea.isActive ? "Deactivate" : "Activate"}
            >
              {idea.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
            </button>
            <button 
              onClick={() => onEdit(idea)}
              className="p-1.5 text-on-surface-variant hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Edit2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
