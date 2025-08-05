import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ['@flora/library'],
    experimental: {
        externalDir: true
      }
};

export default nextConfig;
