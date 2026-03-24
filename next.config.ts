import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid tracing all of `public/` (large videos) into serverless bundles — Vercel
  // still deploys static assets; this only stops ~1GB+ from being packed into Lambdas.
  outputFileTracingExcludes: {
    "/*": ["./public/**/*"],
  },
};

export default nextConfig;
