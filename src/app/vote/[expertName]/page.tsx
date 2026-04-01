"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ThumbsUp, ThumbsDown, CheckCircle, ArrowRight, Loader2, PenTool, Sparkles, MessageCircle, FileText, ChevronRight } from "lucide-react";

type Phase = "intro" | "review" | "feedback" | "recommendations" | "closing";

export default function ExpertVotePage() {
  const { expertName } = useParams();
  const decodedExpertName = decodeURIComponent(expertName as string);
  const formattedExpertName = decodedExpertName.charAt(0).toUpperCase() + decodedExpertName.slice(1);
  
  const ideas = useQuery(api.ideas.listActive);
  const submitFeedback = useMutation(api.feedback.submit);
  const submitGeneralFeedback = useMutation(api.feedback.submitGeneral);

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVote, setCurrentVote] = useState<boolean | null>(null);
  
  const [reasonsForFailure, setReasonsForFailure] = useState("");
  const [existingSolutions, setExistingSolutions] = useState("");
  const [hiddenHurdles, setHiddenHurdles] = useState("");

  const [generalFeedback, setGeneralFeedback] = useState("");
  const [relatedIdeas, setRelatedIdeas] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase, currentIndex]);

  if (!ideas) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  const currentIdea = ideas[currentIndex];

  const handleStart = () => setPhase("review");

  const handleVote = (vote: boolean) => {
    setCurrentVote(vote);
    setPhase("feedback");
  };

  const handleSubmitReview = async () => {
    if (currentIdea && currentVote !== null) {
      await submitFeedback({
        ideaId: currentIdea._id,
        expertName: formattedExpertName,
        vote: currentVote,
        reasonsForFailure,
        existingSolutions,
        hiddenHurdles,
      });

      setReasonsForFailure("");
      setExistingSolutions("");
      setHiddenHurdles("");
      setCurrentVote(null);

      if (currentIndex < ideas.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setPhase("review");
      } else {
        setPhase("recommendations");
      }
    }
  };

  const handleSubmitRecommendations = async () => {
    await submitGeneralFeedback({
      expertName: formattedExpertName,
      generalFeedback,
      relatedIdeas,
    });
    setPhase("closing");
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center relative overflow-x-hidden pb-32 md:pb-0">
      {/* Editorial Header (Stays constant mostly) */}
      <header className="w-full max-w-4xl px-6 py-8 md:py-12 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/5 rounded-sm flex items-center justify-center border border-primary/10">
            <PenTool className="text-primary" size={16} />
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary">
            Intelligence <span className="text-primary italic">Protocol</span>
          </div>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary/40">
          Ref: {formattedExpertName.toUpperCase()} // 2026
        </div>
      </header>

      <main className="w-full max-w-4xl px-6 flex-1 flex flex-col min-h-0">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col justify-center max-w-2xl"
            >
              <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-[0.9] text-on-surface tracking-tighter uppercase">
                Strategic <br /><span className="text-primary italic">Appraisal</span>
              </h1>
              <p className="text-on-surface/70 text-lg md:text-xl mb-12 leading-relaxed text-balance font-medium border-l border-primary/20 pl-8 py-2">
                Welcome <span className="text-on-surface font-bold underline decoration-primary/30 underline-offset-4">{formattedExpertName}</span>. Please take a look through the concepts I&rsquo;m working on. I&rsquo;d love to get your honest feedback on them. Excited to hear what you think.
              </p>
              <button
                onClick={handleStart}
                className="ink-button self-start flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] py-5 px-12"
              >
                Lets Begin <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {phase === "review" && currentIdea && (
            <motion.div
              key="review"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col min-h-0"
            >
              {/* Draft Label */}
              <div className="flex items-center justify-between mb-12 shrink-0">
                <div className="bg-primary/5 border border-primary/10 px-4 py-1.5 rounded-sm">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                    DRAFT {currentIndex + 1} OF {ideas.length}
                  </span>
                </div>
              </div>

              {/* Editorial Concept View */}
              <div className="flex-1 flex flex-col md:flex-row gap-12 md:gap-24 min-h-0 overflow-hidden">
                {/* Left Col: The Abstract */}
                <div className="md:w-1/3 flex flex-col gap-8 shrink-0">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-on-surface leading-[0.9] tracking-tighter uppercase mb-4">
                      {currentIdea.title}
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 italic">
                      {currentIdea.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[8px] font-bold uppercase tracking-[0.3em] text-tertiary">01. The Context</h3>
                    <div className="text-lg md:text-sm leading-relaxed text-on-surface/70 font-medium italic">
                      {currentIdea.problem}
                    </div>
                  </div>
                </div>

                {/* Right Col: The Vision */}
                <div className="flex-1 flex flex-col gap-12 min-h-0">
                <div className="space-y-4">
                    <h3 className="text-[8px] font-bold uppercase tracking-[0.3em] text-tertiary">02. The Proposed Solution</h3>
                    <div className="text-lg md:text-3xl font-display font-medium text-on-surface leading-relaxed tracking-tight">
                      {currentIdea.pitch}
                    </div>
                  </div>

                  <div className="space-y-4 flex-1 min-h-0 flex flex-col">
                    <h3 className="text-[8px] font-bold uppercase tracking-[0.3em] text-tertiary flex items-center gap-2">
                      <Sparkles size={10} /> 03. Tactical Specs
                    </h3>
                    <div className="flex flex-wrap gap-2 overflow-y-auto no-scrollbar pb-12">
                      {currentIdea.features.map((feature, i) => (
                        <div key={i} className="bg-surface-container-low border border-outline-variant px-4 py-2 asymmetric-card shrink-0">
                          <span className="text-[10px] font-bold text-on-surface/80 uppercase tracking-tighter">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed-Position Voting (Handled by Layout but represented here) */}
              <div className="fixed bottom-0 left-0 w-full p-6 md:p-12 flex justify-center pointer-events-none z-30">
                <div className="bg-surface/80 backdrop-blur-xl border border-outline-variant p-2 flex gap-4 pointer-events-auto shadow-2xl asymmetric-card max-w-md w-full">
                  <button
                    onClick={() => handleVote(true)}
                    className="flex-1 group flex items-center justify-center gap-3 py-4 bg-tertiary text-surface font-bold uppercase text-[10px] tracking-widest hover:rotate-1 transition-all"
                  >
                    <ThumbsUp size={14} className="opacity-60" /> Yes
                  </button>
                  <button
                    onClick={() => handleVote(false)}
                    className="flex-1 group flex items-center justify-center gap-3 py-4 bg-primary text-surface font-bold uppercase text-[10px] tracking-widest hover:-rotate-1 transition-all"
                  >
                    <ThumbsDown size={14} className="opacity-60" /> No
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {phase === "feedback" && (
            <motion.div
              key="feedback"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col max-w-xl self-start w-full"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-display font-bold text-on-surface uppercase tracking-tight">
                  Expert <span className="text-primary italic">Critique</span>
                </h2>
                <div className={`px-4 py-1 border text-[10px] font-bold uppercase tracking-[0.2em] ${currentVote ? 'border-tertiary/20 text-tertiary' : 'border-primary/20 text-primary'}`}>
                  {currentVote ? 'VALIDATION' : 'EXPOSURE'}
                </div>
              </div>

              <div className="space-y-12">
                <div className="sketched-underline pb-1">
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-tertiary mb-3">01. Why will it not work?</label>
                  <textarea
                    value={reasonsForFailure}
                    onChange={(e) => setReasonsForFailure(e.target.value)}
                    className="w-full bg-transparent outline-none text-base font-medium h-24 resize-none leading-relaxed placeholder:text-outline-variant italic"
                    placeholder="If this idea fails what do you think the reason would be"
                  />
                </div>
                <div className="sketched-underline pb-1">
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-tertiary mb-3">02. How is the problem currently being solved?</label>
                  <textarea
                    value={existingSolutions}
                    onChange={(e) => setExistingSolutions(e.target.value)}
                    className="w-full bg-transparent outline-none text-base font-medium h-24 resize-none leading-relaxed placeholder:text-outline-variant italic"
                    placeholder="Is the current solution “good enough” or would someone pay for a cheaper / better / faster solution"
                  />
                </div>
                <div className="sketched-underline pb-1">
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-tertiary mb-3">03. What am I missing?</label>
                  <textarea
                    value={hiddenHurdles}
                    onChange={(e) => setHiddenHurdles(e.target.value)}
                    className="w-full bg-transparent outline-none text-base font-medium h-24 resize-none leading-relaxed placeholder:text-outline-variant italic"
                    placeholder="Is there some regulatory or other hurdle I’m missing"
                  />
                </div>

                <button
                  onClick={handleSubmitReview}
                  className="ink-button flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] py-5 px-12"
                >
                  Submit <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {phase === "recommendations" && (
            <motion.div
              key="recommendations"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col max-w-xl self-start w-full"
            >
              <h2 className="text-4xl font-display font-bold text-on-surface uppercase tracking-tight mb-4">
                Strategic <span className="text-primary italic">Advisory</span>
              </h2>
              <p className="text-on-surface/60 text-sm mb-12 leading-relaxed font-medium">
                Beyond the concepts reviewed, do you have any related ideas or general feedback for our venture studio?
              </p>

              <div className="space-y-12">
                <div className="sketched-underline pb-1">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary mb-3">Related Concepts</label>
                  <textarea
                    value={relatedIdeas}
                    onChange={(e) => setRelatedIdeas(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm font-medium h-32 resize-none leading-relaxed placeholder:text-outline-variant italic"
                    placeholder="Are there other gaps in this market we should explore?"
                  />
                </div>
                <div className="sketched-underline pb-1">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary mb-3">General Directives</label>
                  <textarea
                    value={generalFeedback}
                    onChange={(e) => setGeneralFeedback(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm font-medium h-32 resize-none leading-relaxed placeholder:text-outline-variant italic"
                    placeholder="Any overarching feedback for our tactical roadmap?"
                  />
                </div>

                <button
                  onClick={handleSubmitRecommendations}
                  className="ink-button flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] py-5 px-12"
                >
                  Finalize Briefing <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {phase === "closing" && (
            <motion.div
              key="closing"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col justify-center max-w-2xl"
            >
              <div className="w-16 h-16 bg-primary/5 border border-primary/10 rounded-sm flex items-center justify-center mb-10">
                <CheckCircle size={32} className="text-primary opacity-60" />
              </div>
              <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-[0.9] text-on-surface tracking-tighter uppercase">
                Appraisal <br /><span className="text-primary italic">Complete</span>
              </h1>
              <p className="text-on-surface/70 text-lg md:text-xl mb-12 leading-relaxed text-balance font-medium border-l border-primary/20 pl-8 py-2">
                Thank you for your professional contribution, <span className="text-on-surface font-bold underline decoration-primary/30 underline-offset-4">{formattedExpertName}</span>. Your feedback has been recorded in the central matrix and will be reviewed by the founding team.
              </p>
              <div className="h-0.5 w-12 bg-primary/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
