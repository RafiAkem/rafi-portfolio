import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build on the GitHub runner and ship ONLY the build output to the VPS.
  // `standalone` traces the exact node_modules the server needs (~50MB) instead of
  // the full dependency tree (~450MB), which is what makes artifact-only deploys
  // cheap. The VPS then runs `node server.js` rather than `next start`.
  // Note: .next/static and public/ are NOT included by Next and must be copied in
  // by the workflow.
  output: "standalone",
  // TypeScript 7 dropped the compiler API Next used, so type checking runs
  // through the tsc CLI instead.
  experimental: { useTypeScriptCli: true },
  // Every image on the site is a local asset under /public, so no remote
  // patterns are needed. Add one here only if a project screenshot ever moves
  // to a CDN.
};

export default nextConfig;
