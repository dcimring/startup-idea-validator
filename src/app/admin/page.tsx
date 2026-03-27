"use client";

import { useState } from "react";
import AdminIdeaForm from "@/components/AdminIdeaForm";
import AdminIdeaList from "@/components/AdminIdeaList";
import RealTimeFeedbackTable from "@/components/RealTimeFeedbackTable";
import StatusOrbs from "@/components/StatusOrbs";
import { Plus, LayoutDashboard, Database, Activity, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
    <main className="h-screen flex bg-surface-dim relative overflow-hidden">
      {/* Background Effects */}
      <div className="ambient-glow top-0 left-0" />
      <div className="ambient-glow bottom-0 right-0 opacity-20" />

      {/* Sidebar - Concept Inventory */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-full border-r border-white/5 bg-surface/50 backdrop-blur-xl flex flex-col z-20 min-w-0"
      >
        <div className="h-24 px-8 flex items-center border-b border-white/5 shrink-0 overflow-hidden whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-glow rounded-lg flex items-center justify-center cyan-glow">
              <LayoutDashboard size={18} className="text-surface" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">
              Idea <span className="text-primary-glow font-serif italic">Validator</span>
            </h1>
          </div>
        </div>

        <div className="p-8 pt-6 border-b border-white/5 shrink-0 overflow-hidden">
          <button
            onClick={() => handleOpenForm()}
            className="w-full flex items-center justify-center gap-2 bg-primary-glow text-surface font-extrabold py-3 rounded-xl cyan-glow hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <Plus size={18} /> New Concept
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar overflow-x-hidden">
          <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant px-2 whitespace-nowrap">
            <span className="flex items-center gap-2"><Database size={12} /> Concept Inventory</span>
            <span className="bg-white/5 px-2 py-0.5 rounded-full">Active</span>
          </div>
          <AdminIdeaList onEdit={handleOpenForm} />
        </div>
      </motion.aside>

      {/* Sidebar Toggle Button (Floating) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed bottom-8 left-8 z-30 p-4 rounded-2xl glass border-white/10 text-primary-glow shadow-2xl hover:scale-110 active:scale-95 transition-all ${!isSidebarOpen ? 'cyan-glow' : ''}`}
      >
        {isSidebarOpen ? <PanelLeftClose size={24} /> : <PanelLeftOpen size={24} />}
      </button>

      {/* Main Content - Live Feed */}
      <section className="flex-1 h-full flex flex-col z-10 min-w-0">
        <header className="h-auto md:h-24 py-6 md:py-0 px-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-extrabold flex items-center gap-3">
              <Activity className="text-primary-glow" size={24} />
              Command <span className="text-primary-glow font-serif italic">Center</span>
            </h2>
          </div>
          <div className="flex-shrink-0">
            <StatusOrbs />
          </div>
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
