import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/local/:path*",
        destination: `http://localhost:8080/:path*`
      },
    ];
  },
};
export default nextConfig;
