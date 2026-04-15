"use client";

import { useState, useEffect } from "react";
import AdminIdeaForm from "@/components/AdminIdeaForm";
import AdminIdeaList from "@/components/AdminIdeaList";
import RealTimeFeedbackTable from "@/components/RealTimeFeedbackTable";
import ExpertAdvisoryList from "@/components/ExpertAdvisoryList";
import StatusOrbs from "@/components/StatusOrbs";
import { Plus, Database, Activity, FileText, PenTool, X, Menu, LogIn, LogOut, ShieldAlert, Loader2, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function AdminPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"tactical" | "strategic">("tactical");
  const { signIn, signOut } = useAuthActions();
  const adminStatus = useQuery(api.users.getAdminStatus);

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

  if (adminStatus === undefined) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-white/50 font-display uppercase tracking-[0.2em] text-xs">Authenticating Command Center...</p>
      </div>
    );
  }

  if (!adminStatus.isLoggedIn) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black p-8 text-center overflow-hidden relative">
        <div className="absolute inset-0 kinetic-texture opacity-30" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 max-w-md w-full"
        >
          <div className="w-20 h-20 bg-primary mx-auto mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]">
            <Activity size={40} className="text-on-primary" />
          </div>
          <h1 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter mb-4">
            Restricted <span className="text-primary not-italic">Access</span>
          </h1>
          <p className="text-white/60 mb-12 font-medium tracking-tight">Please authenticate to access the startup idea management system.</p>
          <button
            onClick={() => signIn("google", { redirectTo: "/admin" })}
            className="high-voltage-button w-full flex items-center justify-center gap-3 py-5 text-lg group"
          >
            <LogIn size={24} className="group-hover:translate-x-1 transition-transform" /> 
            Sign in with Google
          </button>
        </motion.div>
      </div>
    );
  }

  if (!adminStatus.isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black p-8 text-center">
        <div className="w-20 h-20 bg-red-600 mx-auto mb-8 flex items-center justify-center">
          <ShieldAlert size={40} className="text-white" />
        </div>
        <h1 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter mb-4">
          Unauthorized <span className="text-red-600 not-italic">Entity</span>
        </h1>
        <p className="text-white/60 mb-8 max-w-md">The identity <span className="text-white font-bold">{adminStatus.email}</span> is not registered in the central command database. Access denied.</p>
        <button
          onClick={() => signOut()}
          className="text-white/40 hover:text-white flex items-center gap-2 border border-white/10 px-6 py-3 transition-all hover:bg-white/5 font-black uppercase tracking-widest text-[10px]"
        >
          <LogOut size={16} /> Disconnect Identity
        </button>
      </div>
    );
  }

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
        <header className="h-auto py-4 md:h-24 md:py-0 px-4 md:px-12 flex items-center justify-between gap-2 md:gap-6 border-b border-white/5 bg-surface-container/30 backdrop-blur-xl">
          <div className="flex items-center gap-2 md:gap-8">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 md:p-3 bg-surface-container-highest border border-white/5 text-primary shadow-lg hover:brightness-110 transition-all"
            >
              <Menu size={20} className="md:w-7 md:h-7" />
            </button>
            <h2 className="text-xl md:text-3xl font-display font-black flex items-center gap-2 md:gap-4 text-white uppercase tracking-tighter italic">
              <Activity className="text-primary hidden sm:block" size={28} />
              Command <span className="text-primary not-italic hidden md:inline text-xl">Center</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4 md:gap-12">
            <div className="hidden sm:block">
              <StatusOrbs />
            </div>
            <button
              onClick={() => signOut()}
              className="group flex items-center gap-4 px-4 py-3 md:px-6 md:py-3.5 border border-white/10 hover:border-white hover:bg-white text-white/40 hover:text-black transition-all duration-300 ease-in-out shrink-0"
            >
              <span className="font-black text-[9px] md:text-[10px] tracking-[0.4em] uppercase italic leading-none">
                Logout
              </span>
              <LogOut size={14} className="opacity-20 group-hover:opacity-100 transition-opacity hidden xs:block" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-8 md:p-12 overflow-y-auto no-scrollbar">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4 border-primary pl-6 py-1">
            <div>
              <h3 className="monolith-label text-[9px] mb-0.5">
                Intelligence Stream
              </h3>
              <p className="text-white font-black uppercase text-3xl tracking-tighter italic leading-none">
                {viewMode === "tactical" ? "Live Evaluation Feed" : "Expert Strategic Advisory"}
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-surface-container-highest/50 p-1 border border-white/5 self-start shrink-0">
              <button
                onClick={() => setViewMode("tactical")}
                className={`flex items-center gap-3 px-6 py-3 font-display font-black text-[10px] tracking-[0.2em] uppercase transition-all ${
                  viewMode === "tactical" 
                  ? "bg-primary text-on-primary shadow-xl" 
                  : "text-white/20 hover:text-white/40"
                }`}
              >
                <Activity size={14} /> Tactical Intel
              </button>
              <button
                onClick={() => setViewMode("strategic")}
                className={`flex items-center gap-3 px-6 py-3 font-display font-black text-[10px] tracking-[0.2em] uppercase transition-all ${
                  viewMode === "strategic" 
                  ? "bg-primary text-on-primary shadow-xl" 
                  : "text-white/20 hover:text-white/40"
                }`}
              >
                <Shield size={14} /> Strategic Advisory
              </button>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {viewMode === "tactical" ? (
              <motion.div
                key="tactical"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <RealTimeFeedbackTable />
              </motion.div>
            ) : (
              <motion.div
                key="strategic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ExpertAdvisoryList />
              </motion.div>
            )}
          </AnimatePresence>
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
