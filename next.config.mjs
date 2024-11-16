/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 60,
      static: 180,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/movies/popular',
        permanent: true,
      },
      {
        source: '/movies',
        destination: '/movies/popular',
        permanent: true,
      },
      {
        source: '/tv-shows',
        destination: '/tv-shows/popular',
        permanent: true,
      },
      {
        source: '/settings',
        destination: '/settings/account',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
