/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns:[
      {
        hostname:"readicharge.com"
      },
      {
        hostname:"utfs.io"
      },
      {
        hostname:"images.pexels.com"
      },
      {
        hostname:"maps.google.com"
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
