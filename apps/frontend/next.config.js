/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["ui"],
    // output: "standalone",
    output: "export",
    // Added this as images will not be optimised in export mode
    images: { unoptimized: true },
    experimental: {
      outputFileTracingRoot: path.join(__dirname, "../../"),
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'sass')],
  },
}

module.exports = nextConfig
