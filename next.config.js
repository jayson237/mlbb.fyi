/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "akmwebstatic.yuanzhanapp.com",
        port: "",
        pathname: "/web/madmin/**",
      },
      {
        protocol: "https",
        hostname: "akmweb.youngjoygame.com",
        port: "",
        pathname: "/web/madmin/image/**",
      },
      {
        protocol: "https",
        hostname: "indoch.s3.ml.moonlian.com",
        port: "",
        pathname: "/web/madmin/**",
      },
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
    ],
  },
};

module.exports = nextConfig;
