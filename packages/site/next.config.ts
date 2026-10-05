import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'standalone',
  // the foundations moved onto the landing page
  async redirects() {
    return [{ source: '/foundations', destination: '/', permanent: true }];
  },
};

export default nextConfig;
