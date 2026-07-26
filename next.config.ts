import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Playwright / tools hitting the app via 127.0.0.1 instead of localhost
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
