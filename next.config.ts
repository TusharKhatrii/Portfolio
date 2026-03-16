/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove or comment these lines — Vercel doesn't need them
  // output: 'export',
  // basePath: '/Portfolio',
  // assetPrefix: '/Portfolio/',
  // trailingSlash: true,

  devIndicators: false,
  images: {
    unoptimized: true,  // Keep this if using next/image (required without server)
  },
};

module.exports = nextConfig;