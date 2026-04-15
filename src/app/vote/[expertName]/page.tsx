"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ThumbsUp, ThumbsDown, CheckCircle, ArrowRight, Loader2, PenTool, Sparkles, MessageCircle, FileText, ChevronRight, Heart } from "lucide-react";

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
      <div className="flex items-center justify-center min-h-screen bg-surface kinetic-texture">
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] } },
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center relative overflow-x-hidden pb-32 md:pb-48 kinetic-texture">
      {/* Editorial Header */}
      <header className="w-full max-w-[1600px] px-8 py-8 md:py-12 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary flex items-center justify-center shadow-xl">
            <PenTool className="text-on-primary" size={20} />
          </div>
          <div className="monolith-label mb-0 text-[10px]">
            INTELLIGENCE <span className="italic block text-[8px] tracking-[0.2em] mt-0.5 text-white/20">PROTOCOL v26</span>
          </div>
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 hidden md:block">
          REF: {formattedExpertName.toUpperCase()}
        </div>
      </header>

      <main className="w-full max-w-[1600px] px-8 flex-1 flex flex-col min-h-0">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col justify-center items-center text-center max-w-3xl mx-auto"
            >
              <h1 className="text-display-lg mb-8 text-white italic">
                Strategic <br /><span className="text-primary not-italic">Appraisal</span>
              </h1>
              <p className="text-white/40 text-xl md:text-3xl mb-12 leading-[1.4] md:leading-[1.3] font-black uppercase tracking-tighter border-y-2 border-primary py-8">
                Welcome <span className="text-white underline decoration-primary underline-offset-[6px]">{formattedExpertName}</span>. <br />
                I have <span className="text-white underline decoration-primary underline-offset-[6px]">{ideas.length} ideas</span> for you to review.<br />
                Your feedback is appreciated <Heart className="inline-block text-red-500 fill-red-500 ml-1 mb-1" size={24} />.<br />
                All fields are optional.
              </p>
              <button
                onClick={handleStart}
                className="high-voltage-button px-12 py-6 text-xl"
              >
                Let's Start <ArrowRight size={24} className="ml-4" />
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
              {/* Desktop Intelligence Grid */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-[320px_1fr_280px] gap-12 md:gap-20 min-h-0">
                
                {/* Column 01: The Identifier */}
                <div className="flex flex-col gap-10 md:border-r md:border-white/5 md:pr-12">
                  <div className="bg-primary px-6 py-2 shadow-lg self-start">
                    <span className="text-[10px] font-black text-on-primary uppercase tracking-[0.4em]">
                      IDEA 0{currentIndex + 1} // 0{ideas.length}
                    </span>
                  </div>
                  
                  <div>
                    <h2 className="text-5xl md:text-5xl font-display font-black text-white leading-[0.85] tracking-tighter uppercase mb-4 italic">
                      {currentIdea.title}
                    </h2>
                    <p className="monolith-label text-xs tracking-tight italic text-white/60">
                      {currentIdea.subtitle}
                    </p>
                  </div>

                  <div className="mt-auto hidden md:block">
                    <div className="monolith-label text-[8px] opacity-20">VERDICT_REQUIRED</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10 leading-relaxed">
                      Please analyze the core architecture and provide a strategic consensus.
                    </div>
                  </div>
                </div>

                {/* Column 02: The Core */}
                <div className="flex flex-col gap-12 min-h-0 md:overflow-y-auto md:no-scrollbar">
                  <div className="space-y-6 bg-surface-container-high p-8 md:p-12 border-l-[12px] border-white/10 ambient-shadow">
                    <h3 className="monolith-label text-[9px]">01. PROBLEM STATEMENT</h3>
                    <div className="text-lg md:text-xl leading-tight text-white/40 font-black uppercase tracking-tighter">
                      {currentIdea.problem}
                    </div>
                  </div>

                  <div className="space-y-6 bg-surface-container-high p-8 md:p-12 border-l-[12px] border-primary ambient-shadow">
                    <h3 className="monolith-label text-[9px] text-primary">02. PROPOSED SOLUTION</h3>
                    <div className="text-2xl md:text-4xl font-display font-black text-white leading-tight tracking-tighter uppercase italic">
                      {currentIdea.pitch}
                    </div>
                  </div>
                </div>

                {/* Column 03: The Specs */}
                <div className="flex flex-col gap-8 md:border-l md:border-white/5 md:pl-12">
                  <h3 className="monolith-label text-[9px] flex items-center gap-3">
                    <Sparkles size={14} /> 03. TACTICAL SPECS
                  </h3>
                  <div className="flex flex-col gap-3">
                    {currentIdea.features.map((feature, i) => (
                      <div key={i} className="bg-surface-container-highest px-4 py-3 border-l-4 border-white/5 shrink-0 ambient-shadow">
                        <span className="text-[9px] font-black text-white uppercase tracking-widest leading-none block">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fixed-Position Voting */}
              <div className="fixed bottom-0 left-0 w-full p-0 md:p-12 flex justify-center pointer-events-none z-30">
                <motion.div 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 25 }}
                  className="bg-surface-container/95 backdrop-blur-2xl p-4 md:p-6 flex gap-4 md:gap-10 pointer-events-auto shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-2xl max-w-4xl w-full border-t border-white/10"
                >
                  <button
                    onClick={() => handleVote(true)}
                    className="flex-1 high-voltage-button py-4 md:py-6 text-sm md:text-lg"
                  >
                    Deploy <ThumbsUp size={18} className="ml-2 md:ml-3" />
                  </button>
                  <button
                    onClick={() => handleVote(false)}
                    className="flex-1 secondary-button py-4 md:py-6 text-sm md:text-lg border-white/10 hover:border-white/30"
                  >
                    Abort <ThumbsDown size={18} className="ml-2 md:ml-3" />
                  </button>
                </motion.div>
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
              className="flex-1 flex flex-col max-w-3xl md:self-center w-full"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter italic">
                  Expert <span className="text-primary not-italic">Critique</span>
                </h2>
                <div className={`hidden md:block px-6 py-2 font-black uppercase tracking-[0.5em] text-xs shadow-2xl ${currentVote ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-white/20'}`}>
                  {currentVote ? 'VALIDATION' : 'EXPOSURE'}
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <label className="monolith-label text-[10px]">01. Why will it not work?</label>
                  <textarea
                    value={reasonsForFailure}
                    onChange={(e) => setReasonsForFailure(e.target.value)}
                    className="monolith-input text-xl md:text-2xl h-40 resize-none"
                    placeholder="IF THIS IDEA FAILS WHAT DO YOU THINK THE REASON WOULD BE"
                  />
                </div>
                <div>
                  <label className="monolith-label text-[10px]">02. How is the problem solved today?</label>
                  <textarea
                    value={existingSolutions}
                    onChange={(e) => setExistingSolutions(e.target.value)}
                    className="monolith-input text-xl md:text-2xl h-40 resize-none"
                    placeholder="IS THE CURRENT SOLUTION GOOD ENOUGH OR WOULD SOMEONE PAY FOR A CHEAPER / BETTER / FASTER SOLUTION"
                  />
                </div>
                <div>
                  <label className="monolith-label text-[10px]">03. What am I missing?</label>
                  <textarea
                    value={hiddenHurdles}
                    onChange={(e) => setHiddenHurdles(e.target.value)}
                    className="monolith-input text-xl md:text-2xl h-40 resize-none"
                    placeholder="IS THERE SOME REGULATORY OR OTHER HURDLE I'M MISSING"
                  />
                </div>

                <button
                  onClick={handleSubmitReview}
                  className="high-voltage-button px-16 py-6 text-xl"
                >
                  Submit Feedback <ArrowRight size={24} className="ml-4" />
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
              className="flex-1 flex flex-col max-w-3xl md:self-center w-full"
            >
              <h2 className="text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter italic mb-6">
                Strategic <span className="text-primary not-italic">Advisory</span>
              </h2>
              <p className="text-white/20 text-xl md:text-2xl mb-12 font-black uppercase tracking-tight leading-tight max-w-2xl">
                Beyond the concepts reviewed, do you have any related ideas or general feedback?
              </p>

              <div className="space-y-12">
                <div>
                  <label className="monolith-label text-[10px]">What Is Your Biggest Pain Point Today?</label>
                  <textarea
                    value={relatedIdeas}
                    onChange={(e) => setRelatedIdeas(e.target.value)}
                    className="monolith-input text-xl md:text-2xl h-40 resize-none"
                    placeholder="IN YOUR DAY TO DAY WORK WHAT IS THE BIGGEST PAIN POINT RIGHT NOW THAT YOU WOULD LOVE TO SOLVE"
                  />
                </div>
              
                <button
                  onClick={handleSubmitRecommendations}
                  className="high-voltage-button px-16 py-6 text-xl"
                >
                  Finalize Feedback <ArrowRight size={24} className="ml-4" />
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
              className="flex-1 flex flex-col justify-center items-center text-center max-w-3xl mx-auto"
            >
              <div className="w-16 h-16 bg-primary flex items-center justify-center mb-10 shadow-xl">
                <CheckCircle size={36} className="text-on-primary" />
              </div>
              <h1 className="text-display-lg mb-8 text-white italic">
                Appraisal <br /><span className="text-primary not-italic">Complete</span>
              </h1>
              <p className="text-white/40 text-xl md:text-3xl mb-12 leading-tight font-black uppercase tracking-tighter border-y-2 border-primary py-8">
                Thank you, <span className="text-white underline decoration-primary underline-offset-8">{formattedExpertName}</span> <Heart className="inline-block text-red-500 fill-red-500 ml-1 mb-1" size={24} />. <br />
                Feedback recorded in the central matrix. <br />
              </p>
              <div className="h-2 w-32 bg-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
