/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/goal-lab',
  assetPrefix: '/goal-lab/',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/goal-lab',
  },
}

export default nextConfig
