import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable dev indicators
  devIndicators: false,

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Disable web vitals tracking that might trigger overlays
  experimental: {
    webVitalsAttribution: [],
  },
};

export default nextConfig;
