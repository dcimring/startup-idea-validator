import Link from "next/link";
import { ArrowRight, FileText, Star, PenTool } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-surface relative overflow-hidden kinetic-texture">
      {/* Heavy Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center w-full monolith-container z-10 py-12 md:py-24">
        <div className="flex items-center justify-center mb-10">
          <div className="w-16 h-16 bg-primary flex items-center justify-center shadow-[0_10px_20px_rgba(253,228,0,0.15)]">
            <PenTool className="text-on-primary" size={28} />
          </div>
        </div>
        
        <h1 className="text-display-lg mb-8 text-white italic">
          Idea <span className="text-primary not-italic">Validator</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-white/40 mb-16 leading-tight max-w-3xl mx-auto font-black uppercase tracking-[-0.04em]">
          High-Fidelity Concept Appraisal. <br />
          <span className="text-white">Real-Time Expert Intelligence Protocol.</span>
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
          <Link href="/admin" className="monolith-card p-10 md:p-12 hover:bg-surface-container-high transition-all group relative overflow-hidden border-l-[8px] border-primary ambient-shadow">
            <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center mb-8">
              <FileText className="text-primary" size={24} />
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-black mb-4 text-white uppercase tracking-tighter group-hover:text-primary transition-colors italic leading-none">Admin Portal</h3>
            <p className="text-white/40 text-[10px] mb-12 font-black uppercase tracking-tight leading-relaxed max-w-xs">Manage your concept inventory and monitor live evaluation feeds with surgical precision.</p>
            <div className="high-voltage-button w-full">
              Enter Dashboard <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <div className="monolith-card p-10 md:p-12 opacity-90 hover:opacity-100 transition-opacity border-l-[8px] border-white/10 ambient-shadow">
            <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center mb-8">
              <Star className="text-white/40" size={24} />
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-black mb-4 text-white uppercase tracking-tighter italic leading-none">Expert Review</h3>
            <p className="text-white/40 text-[10px] mb-12 font-black uppercase tracking-tight leading-relaxed max-w-xs">Reviewers access their dedicated evaluation suites via unique secure intelligence links.</p>
            <div className="bg-surface-container-highest p-4 border border-white/5 text-[9px] font-black tracking-[0.4em] text-white/20 uppercase text-center">
              /vote/[expert-identifier]
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
