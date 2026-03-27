import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.108.244"],
  experimental: {
    serverActions: {
      allowedOrigins: ["192.168.108.244", "localhost:3000"],
    },
  },
};

export default nextConfig;
