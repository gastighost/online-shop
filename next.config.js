/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  headers: [
    { key: "Access-Control-Allow-Credentials", value: "true" },
    { key: "Access-Control-Allow-Origin", value: "*" },
  ],
  images: {
    domains: ["upload.wikimedia.org", "www.akc.org", "cdn.britannica.com"],
  },
};

module.exports = nextConfig;
