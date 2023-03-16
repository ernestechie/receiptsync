/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd13zppfo7b7q25.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'www.freeiconspng.com',
      },
    ],
  },
};

module.exports = nextConfig;
