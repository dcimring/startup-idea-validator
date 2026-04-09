"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Users, BarChart3, Bookmark } from "lucide-react";

export default function StatusOrbs() {
  const ideas = useQuery(api.ideas.listAll);
  const feedbacks = useQuery(api.feedback.listAll);

  const stats = [
    {
      label: "Inventory",
      value: ideas?.length ?? 0,
      icon: Bookmark,
    },
    {
      label: "Expert Feed",
      value: feedbacks?.length ?? 0,
      icon: BarChart3,
    },
    {
      label: "Collaborators",
      value: new Set(feedbacks?.map((f) => f.expertName)).size,
      icon: Users,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-16">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-6">
          <div className="w-14 h-14 bg-surface-container-highest flex items-center justify-center border-l-4 border-primary shadow-xl">
            <stat.icon className="text-primary" size={28} />
          </div>
          <div>
            <div className="text-4xl font-display font-black text-white leading-none tracking-[-0.08em] uppercase italic">
              {stat.value}
            </div>
            <div className="monolith-label text-[8px] mb-0 mt-2 tracking-[0.3em]">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
