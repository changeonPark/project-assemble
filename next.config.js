/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactRoot: true,
    scrollRestoration: true,
  },
  images: {
    domains: ['gateway.ipfs.io'],
  },
  // webpack5: true,
  // webpack: config => {
  //   config.resolve.fallback = { fs: false };

  //   return config;
  // },
};

module.exports = nextConfig;
