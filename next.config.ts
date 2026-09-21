import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack scoped to the actual MOCIFY repository. This prevents
  // parent-directory lockfiles from being treated as part of this project.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
