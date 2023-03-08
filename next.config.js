/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api",
  //       destination: "https://api.askjesus.me",
  //     },
  //   ];
  // },
  env: {
    SERVER_HOST: "https://api.askjesus.me",
    FRONT_HOST: "https://www.askjesus.me",
    API_KEY: "$2b$10$.hDUtFyoMibYehgjHVbIpep5UEHeKHdhPkA9TFCiqlLlccP/c7Y6G",
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
