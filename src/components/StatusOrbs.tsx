"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Lightbulb, Users, BarChart3 } from "lucide-react";

export default function StatusOrbs() {
  const ideas = useQuery(api.ideas.listAll);
  const feedbacks = useQuery(api.feedback.listAll);

  const stats = [
    {
      label: "Total Concepts",
      value: ideas?.length ?? 0,
      icon: Lightbulb,
      color: "text-primary-glow",
      bg: "bg-primary-glow/10",
    },
    {
      label: "Expert Reviews",
      value: feedbacks?.length ?? 0,
      icon: BarChart3,
      color: "text-secondary-glow",
      bg: "bg-secondary-glow/10",
    },
    {
      label: "Unique Experts",
      value: new Set(feedbacks?.map((f) => f.expertName)).size,
      icon: Users,
      color: "text-on-surface",
      bg: "bg-white/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="glass p-4 rounded-2xl border-white/5 flex items-center gap-4">
          <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center border border-white/5`}>
            <stat.icon className={stat.color} size={24} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-on-surface leading-none mb-1">
              {stat.value}
            </div>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
