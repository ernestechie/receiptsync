/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
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

  // async rewrites() {
  //   return [
  //     {
  //       source: '/login',
  //       destination: 'https://receipts-app.onrender.com/api/auth/login',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
