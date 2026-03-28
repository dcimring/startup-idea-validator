import Link from "next/link";
import { ArrowRight, FileText, Star, PenTool } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface relative overflow-hidden">
      <div className="text-center max-w-3xl z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary/5 rounded-sm flex items-center justify-center border border-primary/10">
            <PenTool className="text-primary" size={24} />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8 text-on-surface uppercase">
          Idea <span className="text-primary italic">Validator</span>
        </h1>
        
        <p className="text-xl text-on-surface/70 mb-16 leading-relaxed text-balance font-medium">
          Get real-time feedback for your startup ideas from industry experts. 
          The professional protocol for high-fidelity concept validation.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <Link href="/admin" className="bg-surface-container-lowest p-10 asymmetric-card border border-outline-variant hover:shadow-xl hover:rotate-1 transition-all group text-left">
            <div className="w-12 h-12 bg-primary/5 rounded-sm flex items-center justify-center mb-8 border border-primary/10">
              <FileText className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3 text-on-surface uppercase tracking-tight group-hover:text-primary transition-colors">Admin Portal</h3>
            <p className="text-on-surface/60 text-sm mb-8 font-medium">Manage your concept inventory and monitor live evaluation feeds.</p>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em]">
              Enter Dashboard <ArrowRight size={14} />
            </div>
          </Link>

          <div className="bg-surface-container p-10 asymmetric-card border border-outline-variant text-left relative overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 bg-tertiary/5 rounded-sm flex items-center justify-center mb-8 border border-tertiary/10">
              <Star className="text-tertiary" size={24} />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3 text-on-surface uppercase tracking-tight">Expert Review</h3>
            <p className="text-on-surface/60 text-sm mb-6 font-medium">Experts access their dedicated evaluation suites via unique secure links.</p>
            <div className="text-[10px] font-mono text-tertiary bg-white/50 p-3 border border-outline-variant/20 tracking-wider">
              /vote/[expert-identifier]
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
