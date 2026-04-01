import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    ideaId: v.id("ideas"),
    expertName: v.string(),
    vote: v.boolean(),
    reasonsForFailure: v.string(),
    existingSolutions: v.string(),
    hiddenHurdles: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("feedback", args);
  },
});

export const submitGeneral = mutation({
  args: {
    expertName: v.string(),
    generalFeedback: v.string(),
    relatedIdeas: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("generalFeedback", args);
  },
});

export const listAll = query({
  handler: async (ctx) => {
    const feedback = await ctx.db.query("feedback").order("desc").collect();
    // Resolve idea titles manually (or use internal joining if preferred, but manual is simple for now)
    const results = await Promise.all(
      feedback.map(async (f) => {
        const idea = await ctx.db.get(f.ideaId);
        return {
          ...f,
          ideaTitle: idea?.title ?? "Unknown Idea",
        };
      })
    );
    return results;
  },
});
