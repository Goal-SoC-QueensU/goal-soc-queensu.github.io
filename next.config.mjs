/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // ── NO basePath / assetPrefix ──────────────────────────
  // Your site will now be hosted at the root URL
  // https://goal-soc-queensu.github.io/
  // -------------------------------------------------------

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
    // components expect this variable; keep it but point to root
    NEXT_PUBLIC_BASE_PATH: "",
  },
};

export default nextConfig;
