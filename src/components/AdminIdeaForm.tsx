"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Plus, X, Sparkles, ArrowRight } from "lucide-react";
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
            className="fixed inset-0 bg-surface-dim/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-2xl rounded-3xl overflow-hidden border-white/10 shadow-2xl relative"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-glow/10 rounded-xl flex items-center justify-center border border-primary-glow/20">
                      <Sparkles className="text-primary-glow" size={20} />
                    </div>
                    <h2 className="text-3xl font-extrabold font-serif italic text-primary-glow">
                      New Concept
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-on-surface-variant"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full bg-surface-container-low border border-white/5 rounded-xl p-3 focus:border-primary-glow outline-none transition-all text-sm"
                          placeholder="Project Name..."
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Subtitle</label>
                        <input
                          type="text"
                          value={subtitle}
                          onChange={(e) => setSubtitle(e.target.value)}
                          className="w-full bg-surface-container-low border border-white/5 rounded-xl p-3 focus:border-primary-glow outline-none transition-all text-sm"
                          placeholder="Short description..."
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Elevator Pitch</label>
                        <textarea
                          value={pitch}
                          onChange={(e) => setPitch(e.target.value)}
                          className="w-full bg-surface-container-low border border-white/5 rounded-xl p-3 focus:border-primary-glow outline-none transition-all h-40 text-sm resize-none"
                          placeholder="What problem are we solving?"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-xs font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Key Specifications</label>
                      <div className="max-h-[240px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                        {features.map((feature, index) => (
                          <div key={index} className="flex gap-2 group">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              className="flex-1 bg-surface-container-low border border-white/5 rounded-xl p-3 focus:border-primary-glow outline-none transition-all text-sm"
                              placeholder="Add feature..."
                              required
                            />
                            {features.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
                              >
                                <X size={18} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={addFeatureField}
                        className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-white/10 rounded-xl text-xs font-bold text-on-surface-variant hover:border-primary-glow/50 hover:text-primary-glow transition-all"
                      >
                        <Plus size={14} /> Add Specification
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-glow text-surface font-extrabold py-4 rounded-2xl cyan-glow hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    Deploy to Inventory <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
