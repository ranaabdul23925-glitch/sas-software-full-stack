import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "*.vercel.app",
        "sas-software-full-stack-cwmqdc8t5-rana-c713.vercel.app",
      ],
    },
  },
};

export default nextConfig;