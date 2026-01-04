import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================
  // NUCLEAR OPTION: Disable ALL Dev Indicators
  // ============================================
  devIndicators: {
    buildActivity: false,        // Disables the "building..." indicator
    buildActivityPosition: "bottom-right",
    appIsrStatus: false,          // Disables ISR status indicator
  },

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
