/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        port: '',
        pathname: '/oploverz.news/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'i1.wp.com',
        port: '',
        pathname: '/oploverz.news/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'i2.wp.com',
        port: '',
        pathname: '/oploverz.news/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'i3.wp.com',
        port: '',
        pathname: '/oploverz.news/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'oploverz.news',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
