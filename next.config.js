/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/embed/avatars/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dvm5vog2j/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "akmweb.youngjoygame.com",
      },
    ],
    formats: ["image/webp"],
  },
  // rewrites: async () => {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination:
  //         process.env.NODE_ENV === "development"
  //           ? "http://127.0.0.1:5328/api/:path*"
  //           : "/api/",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
