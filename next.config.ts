import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",          // Static HTML export → generates /out folder
  ...(isProduction && {
    basePath: "/Portfolio",    // GitHub Pages serves at /Portfolio (repo name)
    assetPrefix: "/Portfolio/",
    trailingSlash: true,       // Ensures /about/ instead of /about (needed for GH Pages)
  }),
  devIndicators: false,
  images: {
    unoptimized: true,       // Required for static export — no server-side image processing
  },
};

export default nextConfig;
