/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{
      // matching all API routes
      source: "/api/:path*",
      headers: [{
        key: "Access-Control-Allow-Credentials",
        value: "true"
      }, {
        key: "Access-Control-Allow-Origin",
        value: "*"
      },
      // replace this your actual origin
      {
        key: "Access-Control-Allow-Methods",
        value: "GET,DELETE,PATCH,POST,PUT"
      }, {
        key: "Access-Control-Allow-Headers",
        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
      }]
    }];
  },
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "dfstudio-d420.kxcdn.com",
      port: "",
      pathname: "/**"
    }, {
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
      port: "",
      pathname: "/**"
    }, {
      protocol: "https",
      hostname: "avatar.iran.liara.run",
      port: "",
      pathname: "/**"
    }, {
      protocol: "https",
      hostname: "media.graphassets.com",
      port: "",
      pathname: "/**"
    }]
  }
};

export default nextConfig;
