import type { NextConfig } from "next";

const basePath = process.env.GITHUB_ACTIONS === "true" ? "/Julia_site" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,

  output: "export",
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
