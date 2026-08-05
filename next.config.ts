import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript 7 dropped the compiler API Next used, so type checking runs
  // through the tsc CLI instead.
  experimental: { useTypeScriptCli: true },
  // Every image on the site is a local asset under /public, so no remote
  // patterns are needed. Add one here only if a project screenshot ever moves
  // to a CDN.
};

export default nextConfig;
