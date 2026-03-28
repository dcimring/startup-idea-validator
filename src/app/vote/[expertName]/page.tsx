"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, CheckCircle, ArrowRight, Loader2, PenTool, Sparkles, MessageCircle, FileText } from "lucide-react";

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
  
  const [likeFeedback, setLikeFeedback] = useState("");
  const [dislikeFeedback, setDislikeFeedback] = useState("");
  const [comments, setComments] = useState("");

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
        likeFeedback,
        dislikeFeedback,
        comments,
      });

      setLikeFeedback("");
      setDislikeFeedback("");
      setComments("");
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

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-6 pt-12 md:pt-12 bg-surface relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center max-w-2xl mt-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/5 rounded-sm flex items-center justify-center border border-primary/10">
                <PenTool className="text-primary" size={24} />
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary">
              Private Intelligence Briefing
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mt-4 mb-8 leading-tight text-on-surface tracking-tight">
              Strategic <span className="text-primary italic">Appraisal</span>
            </h1>
            <p className="text-on-surface/70 text-lg mb-12 leading-relaxed text-balance font-medium">
              Welcome <span className="text-on-surface font-bold underline decoration-primary/30 underline-offset-4">{formattedExpertName}</span>. Please take a look through the concepts I&rsquo;m working on. I&rsquo;d love to get your honest feedback on them. Excited to hear what you think.
            </p>
            <button
              onClick={handleStart}
              className="ink-button flex items-center gap-3 mx-auto uppercase text-xs font-bold tracking-[0.2em] py-5 px-10"
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
            className="w-full max-w-xl"
          >
            <div className="bg-surface-container-lowest p-10 md:p-16 border border-outline-variant relative asymmetric-card shadow-sm">
              <span className="absolute top-10 right-10 text-[10px] font-bold text-tertiary uppercase tracking-[0.2em]">
                Draft {currentIndex + 1} / {ideas.length}
              </span>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-primary/20 rounded-full" />
                <h2 className="text-3xl md:text-5xl font-display font-bold text-on-surface leading-tight tracking-tight uppercase">
                  {currentIdea.title}
                </h2>
              </div>
              
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-primary/60 mb-10 border-b border-outline-variant/10 pb-4 inline-block">
                {currentIdea.subtitle}
              </p>
              
              <p className="text-xl md:text-2xl text-on-surface mb-12 leading-relaxed italic font-medium border-l-2 border-primary/20 pl-8 py-2">
                &ldquo;{currentIdea.pitch}&rdquo;
              </p>
              
              <div className="space-y-6 mb-16">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary flex items-center gap-2">
                  <FileText size={12} /> Key Specifications
                </h3>
                <ul className="space-y-4">
                  {currentIdea.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 text-on-surface/80 font-medium text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 opacity-40" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-outline-variant/10">
                <button
                  onClick={() => handleVote(true)}
                  className="group flex flex-col items-center gap-4 p-8 bg-surface border border-outline-variant hover:border-tertiary/50 transition-all duration-200"
                >
                  <ThumbsUp size={32} className="text-tertiary opacity-40 group-hover:opacity-100 transition-all group-hover:-translate-y-1" />
                  <span className="font-bold text-xs uppercase tracking-widest text-tertiary">Yes</span>
                </button>
                <button
                  onClick={() => handleVote(false)}
                  className="group flex flex-col items-center gap-4 p-8 bg-surface border border-outline-variant hover:border-primary/50 transition-all duration-200"
                >
                  <ThumbsDown size={32} className="text-primary opacity-40 group-hover:opacity-100 transition-all group-hover:translate-y-1" />
                  <span className="font-bold text-xs uppercase tracking-widest text-primary">No</span>
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
            className="w-full max-w-xl"
          >
            <div className="bg-surface-container-lowest p-10 md:p-16 border border-outline-variant asymmetric-card shadow-sm">
              <div className="flex items-center justify-between mb-12 pb-6 border-b border-outline-variant/10">
                <h2 className="text-3xl font-display font-bold text-on-surface uppercase tracking-tight">
                  Expert <span className="text-primary italic">Critique</span>
                </h2>
                <div className={`px-4 py-1 border text-[10px] font-bold uppercase tracking-[0.2em] ${currentVote ? 'bg-tertiary/5 border-tertiary/20 text-tertiary' : 'bg-primary/5 border-primary/20 text-primary'}`}>
                  {currentVote ? 'VALIDATION' : 'EXPOSURE'}
                </div>
              </div>

              <div className="space-y-10">
                <div className="sketched-underline pb-1">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary mb-3">01. What stands out?</label>
                  <textarea
                    value={likeFeedback}
                    onChange={(e) => setLikeFeedback(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm font-medium h-24 resize-none leading-relaxed placeholder:text-outline-variant italic"
                    placeholder="Identify strengths..."
                  />
                </div>
                <div className="sketched-underline pb-1">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary mb-3">02. Potential Pitfalls?</label>
                  <textarea
                    value={dislikeFeedback}
                    onChange={(e) => setDislikeFeedback(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm font-medium h-24 resize-none leading-relaxed placeholder:text-outline-variant italic"
                    placeholder="Highlight risks..."
                  />
                </div>
                <div className="sketched-underline pb-1">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary mb-3">03. Strategy Annotations</label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm font-medium h-24 resize-none leading-relaxed placeholder:text-outline-variant italic"
                    placeholder="Final thoughts..."
                  />
                </div>

                <button
                  onClick={handleSubmitReview}
                  className="ink-button w-full flex items-center justify-center gap-3 uppercase text-xs font-bold tracking-[0.2em] py-5 mt-4"
                >
                  Submit Review <ArrowRight size={18} />
                </button>
              </div>
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
            className="w-full max-w-xl"
          >
            <div className="bg-surface-container-lowest p-10 md:p-16 border border-outline-variant asymmetric-card shadow-sm">
              <h2 className="text-3xl font-display font-bold text-on-surface uppercase tracking-tight mb-4">
                Strategic <span className="text-primary italic">Advisory</span>
              </h2>
              <p className="text-on-surface/60 text-sm mb-12 leading-relaxed font-medium">
                Beyond the concepts reviewed, do you have any related ideas or general feedback for our strategic direction?
              </p>

              <div className="space-y-10">
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
                  className="ink-button w-full flex items-center justify-center gap-3 uppercase text-xs font-bold tracking-[0.2em] py-5 mt-4"
                >
                  Finalize Briefing <ArrowRight size={18} />
                </button>
              </div>
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
            className="text-center max-w-xl mt-12"
          >
            <div className="w-20 h-20 bg-primary/5 border border-primary/10 rounded-sm flex items-center justify-center mx-auto mb-10">
              <CheckCircle size={40} className="text-primary opacity-60" />
            </div>
            <h1 className="text-5xl font-display font-bold mb-8 leading-tight tracking-tight uppercase">
              Appraisal <span className="text-primary italic">Complete</span>
            </h1>
            <p className="text-on-surface/70 text-lg mb-12 leading-relaxed text-balance font-medium">
              Thank you for your professional contribution, <span className="text-on-surface font-bold underline decoration-primary/30 underline-offset-4">{formattedExpertName}</span>. Your feedback has been recorded in the central matrix and will be reviewed by the founding team.
            </p>
            <div className="h-0.5 w-16 bg-primary/20 mx-auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
