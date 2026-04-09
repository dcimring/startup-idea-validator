"use client";

import { useState, useEffect } from "react";
import AdminIdeaForm from "@/components/AdminIdeaForm";
import AdminIdeaList from "@/components/AdminIdeaList";
import RealTimeFeedbackTable from "@/components/RealTimeFeedbackTable";
import StatusOrbs from "@/components/StatusOrbs";
import { Plus, Database, Activity, FileText, PenTool, X, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingIdea, setEditingIdea] = useState<any>(null);

  // Cmd+B Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenForm = (idea: any = null) => {
    setEditingIdea(idea);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingIdea(null);
    setIsFormOpen(false);
  };

  return (
    <main className="h-screen flex bg-surface relative overflow-hidden kinetic-texture">
      {/* Vertical Spine (Permanent Handle) */}
      <div 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-0 left-0 h-screen w-12 bg-black z-50 flex flex-col items-center py-8 cursor-pointer border-r border-white/5 hover:bg-surface-container-highest transition-colors group"
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-12">
          <div className="h-px w-6 bg-white/10" />
          <div 
            style={{ writingMode: 'vertical-rl' }} 
            className="text-[10px] font-black uppercase tracking-[0.5em] text-primary group-hover:text-white transition-colors rotate-180"
          >
            {isSidebarOpen ? "CLOSE_INVENTORY" : "OPEN_INVENTORY"}
          </div>
          <div className="h-px w-6 bg-white/10" />
        </div>
        <div className="mt-auto">
          {isSidebarOpen ? <ChevronLeft className="text-white/20" size={20} /> : <ChevronRight className="text-primary" size={20} />}
        </div>
      </div>

      {/* Sidebar - Concept Inventory */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : 360) : 0, 
          opacity: isSidebarOpen ? 1 : 0,
          x: isSidebarOpen ? 0 : -20 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`h-full bg-surface-container-low flex flex-col z-40 min-w-0 md:relative fixed inset-0 md:inset-auto border-r border-white/5 shadow-xl ml-12 overflow-hidden`}
      >
        <div className="h-24 px-8 flex items-center justify-between border-b border-white/5 shrink-0 bg-surface-container">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary flex items-center justify-center shadow-lg">
              <FileText size={20} className="text-on-primary" />
            </div>
            <h1 className="text-2xl font-display font-black tracking-tighter text-white uppercase italic leading-none">
              Idea <span className="text-primary not-italic block text-xs tracking-[0.2em] mt-0.5">Validator</span>
            </h1>
          </div>
        </div>

        <div className="p-8 border-b border-white/5 shrink-0 bg-surface-container-high">
          <button
            onClick={() => handleOpenForm()}
            className="high-voltage-button w-full flex items-center justify-center gap-3 py-4"
          >
            <Plus size={20} /> Deploy Concept
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          <div className="flex items-center justify-between monolith-label mb-0">
            <span className="flex items-center gap-3"><PenTool size={12} /> Inventory</span>
            <span className="bg-primary text-on-primary px-2 py-0.5 font-black text-[7px] tracking-widest uppercase">Live</span>
          </div>
          <AdminIdeaList onEdit={handleOpenForm} />
        </div>
      </motion.aside>

      {/* Main Content - Live Feed */}
      <section className="flex-1 h-full flex flex-col z-10 min-w-0 bg-[#070707] relative">
        <header className="h-auto py-6 md:h-24 md:py-0 px-8 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 bg-surface-container/30 backdrop-blur-xl">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-6">
              <h2 className="text-2xl md:text-3xl font-display font-black flex items-center gap-4 text-white uppercase tracking-tighter italic">
                <Activity className="text-primary" size={28} />
                Command <span className="text-primary not-italic hidden sm:inline text-xl">Center</span>
              </h2>
            </div>
          </div>
          <div className="flex-shrink-0">
            <StatusOrbs />
          </div>
        </header>

        <div className="flex-1 p-8 md:p-12 overflow-y-auto no-scrollbar">
          <div className="mb-8 flex items-center justify-between border-l-4 border-primary pl-6 py-1">
            <div>
              <h3 className="monolith-label text-[9px] mb-0.5">
                Intelligence Stream
              </h3>
              <p className="text-white font-black uppercase text-base tracking-tighter">Live Evaluation Feed</p>
            </div>
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
