/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["ui"],
    // output: "standalone",
    output: "export",
    experimental: {
      outputFileTracingRoot: path.join(__dirname, "../../"),
    },
}

module.exports = nextConfig
