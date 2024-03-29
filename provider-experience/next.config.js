/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/patient/:id',
        destination: '/patient/:id/summary',
        permanent: true,
      },
      {
        source: '/',
        destination: '/patient',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
