/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/patient/timeline',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
