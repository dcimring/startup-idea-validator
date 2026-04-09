"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Plus, X, ArrowRight, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminIdeaForm({ 
  isOpen, 
  onClose, 
  initialIdea 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  initialIdea?: any;
}) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [problem, setProblem] = useState("");
  const [pitch, setPitch] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  
  const addIdea = useMutation(api.ideas.add);
  const updateIdea = useMutation(api.ideas.update);

  useEffect(() => {
    if (initialIdea) {
      setTitle(initialIdea.title);
      setSubtitle(initialIdea.subtitle || "");
      setProblem(initialIdea.problem || "");
      setPitch(initialIdea.pitch);
      setFeatures(initialIdea.features.length > 0 ? initialIdea.features : [""]);
    } else {
      setTitle("");
      setSubtitle("");
      setProblem("");
      setPitch("");
      setFeatures([""]);
    }
  }, [initialIdea, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFeatures = features.filter((f) => f.trim() !== "");
    
    if (initialIdea) {
      await updateIdea({
        id: initialIdea._id,
        title,
        subtitle,
        problem,
        pitch,
        features: cleanFeatures,
        isActive: initialIdea.isActive,
      });
    } else {
      await addIdea({
        title,
        subtitle,
        problem,
        pitch,
        features: cleanFeatures,
        isActive: true,
      });
    }
    onClose();
  };

  const addFeatureField = () => setFeatures([...features, ""]);
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-container-low w-full max-w-4xl border-none shadow-2xl relative overflow-hidden flex flex-col max-h-[95vh] rounded-none border-l-[8px] border-primary"
            >
              <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className="p-8 md:p-12">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary flex items-center justify-center shadow-lg">
                        <PenTool className="text-on-primary" size={24} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-display font-black text-white leading-none tracking-tighter uppercase italic">
                          {initialIdea ? 'Edit' : 'New'} <span className="text-primary not-italic">Concept</span>
                        </h2>
                        <p className="monolith-label mt-1 mb-0">Operational Protocol</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/5 transition-colors text-white/20 hover:text-white"
                    >
                      <X size={28} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-8">
                        <div>
                          <label className="monolith-label">01. Identifier</label>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="monolith-input text-lg font-black uppercase tracking-tight"
                            placeholder="PROPTECH_AI_v1"
                            required
                          />
                        </div>
                        <div>
                          <label className="monolith-label">02. Strategic Subtitle</label>
                          <input
                            type="text"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="monolith-input text-sm"
                            placeholder="REAL ESTATE DUE DILIGENCE"
                            required
                          />
                        </div>
                        <div>
                          <label className="monolith-label">03. The Problem</label>
                          <textarea
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                            className="monolith-input h-24 resize-none leading-tight text-sm"
                            placeholder="MARKET PAIN POINT"
                            required
                          />
                        </div>
                        <div>
                          <label className="monolith-label">04. The Solution</label>
                          <textarea
                            value={pitch}
                            onChange={(e) => setPitch(e.target.value)}
                            className="monolith-input h-24 resize-none leading-tight text-sm"
                            placeholder="CONCEPT PITCH"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-8">
                        <label className="monolith-label">05. Functional Specs</label>
                        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 no-scrollbar">
                          {features.map((feature, index) => (
                            <div key={index} className="flex gap-4 group items-center">
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={(e) => updateFeature(index, e.target.value)}
                                  className="monolith-input py-3 text-[10px] font-black tracking-[0.2em]"
                                  placeholder={`SPEC_0${index + 1}`}
                                  required
                                />
                              </div>
                              {features.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeFeature(index)}
                                  className="p-2 text-white/10 hover:text-primary transition-colors"
                                >
                                  <X size={20} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={addFeatureField}
                          className="w-full flex items-center justify-center gap-3 py-4 border-2 border-dashed border-white/5 font-black uppercase tracking-[0.3em] text-[9px] text-white/20 hover:border-primary/50 hover:bg-primary/5 hover:text-white transition-all"
                        >
                          <Plus size={16} /> Add Component
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 pt-10 border-t border-white/5">
                      <button
                        type="submit"
                        className="high-voltage-button flex-1 py-5 text-base"
                      >
                        Commit Concept <ArrowRight size={20} className="ml-3" />
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="secondary-button px-12 py-5 text-base"
                      >
                        Abort
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
