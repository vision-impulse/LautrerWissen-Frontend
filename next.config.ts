// next.config.ts

/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';



const isPWA = true;

const baseConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};


module.exports = isPWA
  ? withPWA({
      dest: "public",
      disable: false,
      register: true,
      skipWaiting: true,
    })(baseConfig)
  : baseConfig;
