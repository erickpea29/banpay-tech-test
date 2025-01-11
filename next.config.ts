import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "ghibliapi.vercel.app", "www.themoviedb.org"],
  },
};

export default nextConfig;
