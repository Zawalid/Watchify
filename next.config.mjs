/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/explore",
        destination: "/explore/movies/popular",
        permanent: true,
      },
      {
        source: "/explore/movies",
        destination: "/explore/movies/popular",
        permanent: true,
      },
      {
        source: "/explore/tv-shows",
        destination: "/explore/tv-shows/popular",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
