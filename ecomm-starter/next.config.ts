import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents: true, // Disabled to avoid conflict with force-dynamic on protected routes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
