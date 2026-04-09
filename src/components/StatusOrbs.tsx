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
    <div className="flex items-center gap-2 sm:gap-4 md:gap-8 lg:gap-16">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-1 md:gap-6 shrink-0">
          <div className="w-7 h-7 md:w-14 md:h-14 bg-surface-container-highest flex items-center justify-center border-l-2 md:border-l-4 border-primary shadow-xl shrink-0">
            <stat.icon className="text-primary md:w-7 md:h-7" size={12} />
          </div>
          <div className="flex flex-col">
            <div className="text-lg md:text-4xl font-display font-black text-white leading-none tracking-[-0.08em] uppercase italic">
              {stat.value}
            </div>
            <div className="hidden lg:block monolith-label text-[8px] mb-0 mt-2 tracking-[0.3em] whitespace-nowrap">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
