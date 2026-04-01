import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ideas: defineTable({
    title: v.string(),
    subtitle: v.optional(v.string()),
    problem: v.optional(v.string()),
    pitch: v.string(),
    features: v.array(v.string()),
    isActive: v.boolean(),
  }),
  feedback: defineTable({
    ideaId: v.id("ideas"),
    expertName: v.string(),
    vote: v.boolean(),
    reasonsForFailure: v.string(),
    existingSolutions: v.string(),
    hiddenHurdles: v.string(),
  }),
  generalFeedback: defineTable({
    expertName: v.string(),
    generalFeedback: v.string(),
    relatedIdeas: v.string(),
  }),
});
