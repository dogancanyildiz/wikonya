import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  ...(process.env.GITHUB_PAGES === 'true' && { output: 'export' }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable image optimization for static export
    ...(process.env.GITHUB_PAGES === 'true' && { unoptimized: true }),
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Headers only work with server-side rendering, skip for static export
  ...(process.env.GITHUB_PAGES !== 'true' && {
    async headers() {
      return [
        {
          source: '/manifest.json',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/manifest+json',
            },
          ],
        },
      ];
    },
  }),
};

export default nextConfig;
