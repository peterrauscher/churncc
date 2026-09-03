import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Keep image behavior aligned with prior <img> usage during refactor.
    unoptimized: true,
  },
};

export default nextConfig;
