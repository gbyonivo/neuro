import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://staging.api.neurolabs.ai/:path*",
      },
    ];
  },
};

export default nextConfig;
