import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAdminStatus = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return { isAdmin: false, isLoggedIn: false };
    }
    const user = await ctx.db.get(userId);
    // Check if the email matches your specific admin email
    const isAdmin = user?.email === "dcimring@gmail.com";
    return { isAdmin, isLoggedIn: true, email: user?.email };
  },
});
