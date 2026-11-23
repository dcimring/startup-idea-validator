import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the app is fully client-side (Convex + Convex Auth run in the
  // browser), so `next build` writes plain files to out/ for Cloudflare Workers.
  output: "export",
  allowedDevOrigins: ["192.168.108.244"],
};

export default nextConfig;
