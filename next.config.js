/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'https://hollister-api-prod.creator.ly',
      },
    ];
  },
  env: {
    SERVER_HOST: 'https://hollister-api-prod.creator.ly',
    API_KEY: '$2b$10$.hDUtFyoMibYehgjHVbIpep5UEHeKHdhPkA9TFCiqlLlccP/c7Y6G',
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
