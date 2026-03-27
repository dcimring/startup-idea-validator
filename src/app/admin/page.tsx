"use client";

import { useState } from "react";
import AdminIdeaForm from "@/components/AdminIdeaForm";
import AdminIdeaList from "@/components/AdminIdeaList";
import RealTimeFeedbackTable from "@/components/RealTimeFeedbackTable";
import StatusOrbs from "@/components/StatusOrbs";
import { Plus, LayoutDashboard, Database, Activity } from "lucide-react";

export default function AdminPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<any>(null);

  const handleOpenForm = (idea: any = null) => {
    setEditingIdea(idea);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingIdea(null);
    setIsFormOpen(false);
  };

  return (
    <main className="min-h-screen flex bg-surface-dim relative overflow-hidden">
      {/* Background Effects */}
      <div className="ambient-glow top-0 left-0" />
      <div className="ambient-glow bottom-0 right-0 opacity-20" />

      {/* Sidebar - Concept Inventory */}
      <aside className="w-80 border-r border-white/5 bg-surface/50 backdrop-blur-xl flex flex-col z-10">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-primary-glow rounded-lg flex items-center justify-center cyan-glow">
              <LayoutDashboard size={18} className="text-surface" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">
              Idea <span className="text-primary-glow font-serif italic">Validator</span>
            </h1>
          </div>
          
          <button
            onClick={() => handleOpenForm()}
            className="w-full flex items-center justify-center gap-2 bg-primary-glow text-surface font-extrabold py-3 rounded-xl cyan-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus size={18} /> New Concept
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant px-2">
            <span className="flex items-center gap-2"><Database size={12} /> Concept Inventory</span>
            <span className="bg-white/5 px-2 py-0.5 rounded-full">Active</span>
          </div>
          <AdminIdeaList onEdit={handleOpenForm} />
        </div>
        
        <div className="p-6 border-t border-white/5">
          <div className="glass p-4 rounded-xl border-white/5 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-on-surface-variant">System Operational</span>
          </div>
        </div>
      </aside>

      {/* Main Content - Live Feed */}
      <section className="flex-1 flex flex-col z-10">
        <header className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-extrabold flex items-center gap-3">
              <Activity className="text-primary-glow" size={24} />
              Command <span className="text-primary-glow font-serif italic">Center</span>
            </h2>
          </div>
          <StatusOrbs />
        </header>

        <div className="flex-1 p-8 pt-0 overflow-y-auto custom-scrollbar">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-on-surface-variant">
              Live Evaluation Feed
            </h3>
          </div>
          <RealTimeFeedbackTable />
        </div>
      </section>

      {/* Overlays */}
      <AdminIdeaForm 
        isOpen={isFormOpen} 
        onClose={handleCloseForm} 
        initialIdea={editingIdea}
      />
    </main>
  );
}
