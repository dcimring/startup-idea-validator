"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, CheckCircle, ArrowRight, Loader2 } from "lucide-react";

type Phase = "intro" | "review" | "feedback" | "closing";

export default function ExpertVotePage() {
  const { expertName } = useParams();
  const decodedExpertName = decodeURIComponent(expertName as string);
  
  const ideas = useQuery(api.ideas.listActive);
  const submitFeedback = useMutation(api.feedback.submit);

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVote, setCurrentVote] = useState<boolean | null>(null);
  
  // Feedback form state
  const [likeFeedback, setLikeFeedback] = useState("");
  const [dislikeFeedback, setDislikeFeedback] = useState("");
  const [comments, setComments] = useState("");

  if (!ideas) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-primary-glow" size={48} />
      </div>
    );
  }

  const currentIdea = ideas[currentIndex];

  const handleStart = () => setPhase("review");

  const handleVote = (vote: boolean) => {
    setCurrentVote(vote);
    setPhase("feedback");
  };

  const handleSubmit = async () => {
    if (currentIdea && currentVote !== null) {
      await submitFeedback({
        ideaId: currentIdea._id,
        expertName: decodedExpertName,
        vote: currentVote,
        likeFeedback,
        dislikeFeedback,
        comments,
      });

      // Reset form
      setLikeFeedback("");
      setDislikeFeedback("");
      setComments("");
      setCurrentVote(null);

      if (currentIndex < ideas.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setPhase("review");
      } else {
        setPhase("closing");
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="ambient-glow top-1/4 left-1/4" />
      <div className="ambient-glow bottom-1/4 right-1/4 opacity-10" />

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center max-w-2xl"
          >
            <span className="text-primary-glow font-extrabold uppercase tracking-widest text-sm">
              Exclusive Access
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mt-4 mb-6 leading-tight">
              Strategic <span className="font-serif italic text-primary-glow">Idea Review</span>
            </h1>
            <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
              Welcome, <span className="text-white font-bold">{decodedExpertName}</span>. Review our current concepts and provide your expert perspective. Your insights shape the future of these ventures.
            </p>
            <button
              onClick={handleStart}
              className="bg-primary-glow text-surface px-8 py-4 rounded-full font-extrabold flex items-center gap-2 mx-auto cyan-glow hover:scale-105 transition-transform"
            >
              Begin Evaluation <ArrowRight size={20} />
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
            <div className="glass p-8 md:p-12 rounded-3xl border-white/10 relative">
              <span className="absolute top-8 right-8 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Concept {currentIndex + 1} of {ideas.length}
              </span>
              <h2 className="text-4xl font-extrabold mb-6 text-primary-glow font-serif italic">
                {currentIdea.title}
              </h2>
              <p className="text-xl text-on-surface mb-8 leading-relaxed italic border-l-4 border-primary-glow/30 pl-6 py-2">
                &ldquo;{currentIdea.pitch}&rdquo;
              </p>
              
              <div className="space-y-4 mb-12">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Key Specifications
                </h3>
                <ul className="space-y-2">
                  {currentIdea.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-on-surface-variant">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-glow mt-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => handleVote(true)}
                  className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-green-500/5 border border-green-500/20 hover:bg-green-500/10 hover:border-green-500/40 transition-all"
                >
                  <ThumbsUp size={32} className="text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="font-extrabold text-green-400">Validate</span>
                </button>
                <button
                  onClick={() => handleVote(false)}
                  className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40 transition-all"
                >
                  <ThumbsDown size={32} className="text-red-400 group-hover:scale-110 transition-transform" />
                  <span className="font-extrabold text-red-400">Concerns</span>
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
            <div className="glass p-8 md:p-12 rounded-3xl border-white/10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-extrabold">
                  Expert <span className="font-serif italic text-primary-glow">Insights</span>
                </h2>
                <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${currentVote ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {currentVote ? 'Validation' : 'Critique'}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">What stands out?</label>
                  <textarea
                    value={likeFeedback}
                    onChange={(e) => setLikeFeedback(e.target.value)}
                    className="w-full bg-surface-container-low border border-white/10 rounded-xl p-4 focus:border-primary-glow outline-none transition-colors h-24 text-sm"
                    placeholder="Identify strengths..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Potential Pitfalls?</label>
                  <textarea
                    value={dislikeFeedback}
                    onChange={(e) => setDislikeFeedback(e.target.value)}
                    className="w-full bg-surface-container-low border border-white/10 rounded-xl p-4 focus:border-primary-glow outline-none transition-colors h-24 text-sm"
                    placeholder="Highlight risks..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Additional Strategy</label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full bg-surface-container-low border border-white/10 rounded-xl p-4 focus:border-primary-glow outline-none transition-colors h-24 text-sm"
                    placeholder="Final thoughts..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-primary-glow text-surface font-extrabold py-4 rounded-xl cyan-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  Submit Review <ArrowRight size={20} />
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
            className="text-center max-w-xl"
          >
            <div className="w-24 h-24 bg-primary-glow/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary-glow/30">
              <CheckCircle size={48} className="text-primary-glow" />
            </div>
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Evaluation <span className="font-serif italic text-primary-glow">Complete</span>
            </h1>
            <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
              Thank you for your professional contribution, <span className="text-white font-bold">{decodedExpertName}</span>. Your feedback has been recorded in the central matrix and will be reviewed by the founding team.
            </p>
            <div className="h-1 w-24 bg-primary-glow/30 mx-auto rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
