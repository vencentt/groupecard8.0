/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 忽略所有类型错误
    ignoreBuildErrors: true,
  },
  eslint: {
    // 忽略所有 ESLint 错误
    ignoreDuringBuilds: true,
  },
  // 配置允许的图片域名
  images: {
    domains: ['images.unsplash.com'],
  },
  // 排除备份文件夹
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/backup/**']
    };
    return config;
  },
  // 添加自定义配置
  env: {
    // 设置API基础URL
    NEXT_PUBLIC_API_BASE_URL: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_API_URL || 'https://www.happyworkanniversary.net'
  },
  // 允许服务器组件中的fetch使用相对URL
  experimental: {
    // Next.js 14中serverActions已默认启用，可以移除此配置
    // serverActions: true
  }
};

export default nextConfig;
