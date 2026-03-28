"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Plus, X, Sparkles, ArrowRight, PenTool } from "lucide-react";
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
  const [pitch, setPitch] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  
  const addIdea = useMutation(api.ideas.add);
  const updateIdea = useMutation(api.ideas.update);

  useEffect(() => {
    if (initialIdea) {
      setTitle(initialIdea.title);
      setSubtitle(initialIdea.subtitle || "");
      setPitch(initialIdea.pitch);
      setFeatures(initialIdea.features.length > 0 ? initialIdea.features : [""]);
    } else {
      setTitle("");
      setSubtitle("");
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
        pitch,
        features: cleanFeatures,
        isActive: initialIdea.isActive,
      });
    } else {
      await addIdea({
        title,
        subtitle,
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
            className="fixed inset-0 bg-on-surface/10 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="asymmetric-card bg-surface-container-lowest w-full max-w-2xl border border-outline-variant shadow-2xl relative overflow-hidden"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center border border-primary/20">
                      <PenTool className="text-primary" size={20} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-display text-on-surface leading-none">
                        {initialIdea ? 'Edit' : 'New'} <span className="text-primary italic">Concept</span>
                      </h2>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary mt-1.5">Drafting Workspace</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors text-tertiary"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div className="sketched-underline pb-1">
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary mb-2">01. Project Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full bg-transparent outline-none text-lg font-display font-bold placeholder:text-outline-variant"
                          placeholder="PropTech AI..."
                          required
                        />
                      </div>
                      <div className="sketched-underline pb-1">
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary mb-2">02. Concept Subtitle</label>
                        <input
                          type="text"
                          value={subtitle}
                          onChange={(e) => setSubtitle(e.target.value)}
                          className="w-full bg-transparent outline-none text-sm font-medium placeholder:text-outline-variant"
                          placeholder="Real Estate Due Diligence"
                          required
                        />
                      </div>
                      <div className="sketched-underline pb-1">
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary mb-2">03. The Pitch</label>
                        <textarea
                          value={pitch}
                          onChange={(e) => setPitch(e.target.value)}
                          className="w-full bg-transparent outline-none text-sm font-medium h-32 resize-none leading-relaxed placeholder:text-outline-variant italic"
                          placeholder="Describe the problem and solution..."
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary">04. Specifications</label>
                      <div className="max-h-[300px] overflow-y-auto pr-4 space-y-4 custom-scrollbar">
                        {features.map((feature, index) => (
                          <div key={index} className="flex gap-3 group items-center">
                            <div className="sketched-underline flex-1 pb-1">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => updateFeature(index, e.target.value)}
                                className="w-full bg-transparent outline-none text-sm font-medium"
                                placeholder="Feature point..."
                                required
                              />
                            </div>
                            {features.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="p-1 text-primary/40 hover:text-primary transition-colors"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={addFeatureField}
                        className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-outline-variant rounded-sm text-[10px] font-bold text-tertiary hover:border-primary/50 hover:text-primary transition-all"
                      >
                        <Plus size={14} /> Add Specification
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
                    <button
                      type="submit"
                      className="ink-button flex-1 flex items-center justify-center gap-2 font-bold uppercase text-xs tracking-widest py-4"
                    >
                      Save Concept <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="ghost-button px-8 font-bold uppercase text-[10px] tracking-widest"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
