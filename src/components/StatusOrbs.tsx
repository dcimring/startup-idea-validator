"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Lightbulb, Users, BarChart3, Bookmark } from "lucide-react";

export default function StatusOrbs() {
  const ideas = useQuery(api.ideas.listAll);
  const feedbacks = useQuery(api.feedback.listAll);

  const stats = [
    {
      label: "Inventory",
      value: ideas?.length ?? 0,
      icon: Bookmark,
      color: "text-primary",
    },
    {
      label: "Expert Feed",
      value: feedbacks?.length ?? 0,
      icon: BarChart3,
      color: "text-tertiary",
    },
    {
      label: "Collaborators",
      value: new Set(feedbacks?.map((f) => f.expertName)).size,
      icon: Users,
      color: "text-on-surface",
    },
  ];

  return (
    <div className="flex items-center gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <stat.icon className={stat.color} size={18} />
          </div>
          <div>
            <div className="text-xl font-display font-bold text-on-surface leading-none">
              {stat.value}
            </div>
            <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-tertiary mt-0.5">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
