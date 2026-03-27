import Link from "next/link";
import { ArrowRight, Shield, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="ambient-glow top-0 left-0" />
      <div className="ambient-glow bottom-0 right-0 opacity-20" />

      <div className="text-center max-w-3xl z-10">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
          Idea <span className="text-primary-glow font-serif italic">Validator</span>
        </h1>
        <p className="text-xl text-on-surface-variant mb-12 leading-relaxed">
          Get real-time feedback for your startup ideas from industry experts. 
          The professional protocol for high-fidelity concept validation.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/admin" className="glass p-8 rounded-3xl border-white/10 hover:border-primary-glow/50 transition-all group text-left">
            <div className="w-12 h-12 bg-primary-glow/10 rounded-2xl flex items-center justify-center mb-6 border border-primary-glow/20">
              <Shield className="text-primary-glow" size={24} />
            </div>
            <h3 className="text-2xl font-extrabold mb-2 group-hover:text-primary-glow transition-colors">Admin Portal</h3>
            <p className="text-on-surface-variant text-sm mb-6">Manage your concept inventory and monitor live evaluation feeds.</p>
            <div className="flex items-center gap-2 text-primary-glow font-bold text-sm">
              Enter Dashboard <ArrowRight size={16} />
            </div>
          </Link>

          <div className="glass p-8 rounded-3xl border-white/10 opacity-80 text-left relative overflow-hidden">
            <div className="w-12 h-12 bg-secondary-glow/10 rounded-2xl flex items-center justify-center mb-6 border border-secondary-glow/20">
              <Star className="text-secondary-glow" size={24} />
            </div>
            <h3 className="text-2xl font-extrabold mb-2">Expert Review</h3>
            <p className="text-on-surface-variant text-sm mb-4">Experts access their dedicated evaluation suites via unique secure links.</p>
            <div className="text-xs font-mono text-secondary-glow/50 bg-secondary-glow/5 p-2 rounded-lg">
              /vote/[expert-identifier]
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
