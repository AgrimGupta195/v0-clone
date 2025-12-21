/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
  },
};

export default nextConfig;
