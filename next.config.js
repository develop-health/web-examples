/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/patient/:id',
        destination: '/patient/:id/timeline',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
