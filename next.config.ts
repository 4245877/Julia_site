import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  output: "export",
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  basePath: isGithubActions ? "/Julia_site" : "",
  assetPrefix: isGithubActions ? "/Julia_site/" : "",
};

export default nextConfig;