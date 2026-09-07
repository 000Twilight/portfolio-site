import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: [
    "192.168.18.20",
    "192.168.18.20:3000",
    "localhost:3000",
  ],
};

export default nextConfig;
