/** @type {import('next').NextConfig} */
const config = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      {
        protocol: "https",
        hostname: "anirudh435-cattle-buffalo-breed-fastapi.hf.space",
      },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/BreedDetection", destination: "/detect", permanent: true },
      { source: "/HowItWorks", destination: "/how-it-works", permanent: true },
      {
        source: "/WhatWeProvide",
        destination: "/what-we-provide",
        permanent: true,
      },
      { source: "/HelpGuide", destination: "/help-guide", permanent: true },
    ];
  },
};

export default config;
