/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
      },
    ],
  },
};

module.exports = nextConfig;
