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
  // 排除备份文件夹
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/backup/**']
    };
    return config;
  }
};

export default nextConfig;
