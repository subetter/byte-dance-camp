import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Next.js 16 默认使用 Turbopack，如果需要使用 webpack，需要明确指定
  // 或者添加空的 turbopack 配置来避免警告
  turbopack: {},
};

export default nextConfig;
