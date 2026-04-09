"use client";

import { useState, useEffect } from "react";
import AdminIdeaForm from "@/components/AdminIdeaForm";
import AdminIdeaList from "@/components/AdminIdeaList";
import RealTimeFeedbackTable from "@/components/RealTimeFeedbackTable";
import StatusOrbs from "@/components/StatusOrbs";
import { Plus, Database, Activity, FileText, PenTool, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      {/* Sidebar - Concept Inventory */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop for Mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
            />
            
            <motion.aside 
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed top-0 left-0 h-screen w-[360px] bg-surface-container-low flex flex-col z-50 border-r border-white/5 shadow-[20px_0_60px_rgba(0,0,0,0.8)] overflow-hidden"
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
                <button 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="p-3 text-white/20 hover:text-white hover:bg-white/5 transition-all"
                >
                  <X size={32} />
                </button>
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
                  <span className="bg-primary text-on-primary px-2 py-0.5 font-black text-[7px] tracking-widest uppercase">Live Feed</span>
                </div>
                <AdminIdeaList onEdit={handleOpenForm} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content - Live Feed */}
      <section className="flex-1 h-full flex flex-col z-10 min-w-0 bg-[#070707] relative">
        <header className="h-auto py-6 md:h-24 md:py-0 px-8 md:px-12 flex items-center justify-between gap-6 border-b border-white/5 bg-surface-container/30 backdrop-blur-xl">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 bg-surface-container-highest border border-white/5 text-primary shadow-lg hover:brightness-110 transition-all"
            >
              <Menu size={28} />
            </button>
            <h2 className="text-2xl md:text-3xl font-display font-black flex items-center gap-4 text-white uppercase tracking-tighter italic">
              <Activity className="text-primary" size={28} />
              Command <span className="text-primary not-italic hidden sm:inline text-xl">Center</span>
            </h2>
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
