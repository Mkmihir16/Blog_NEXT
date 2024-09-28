/** @type {import('next').NextConfig} */
const nextConfig = {};
// next.config.js
// next.config.mjs
export default {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
          pathname: '/**',
        },
      ],
    },
  }
  
