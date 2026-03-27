import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    title: v.string(),
    subtitle: v.optional(v.string()),
    pitch: v.string(),
    features: v.array(v.string()),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("ideas", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("ideas"),
    title: v.string(),
    subtitle: v.optional(v.string()),
    pitch: v.string(),
    features: v.array(v.string()),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const listActive = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("ideas")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

export const listAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("ideas").collect();
  },
});
