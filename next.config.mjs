/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.onixframe.com" }],
        destination: "https://onixframe.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "frontend-portfolio-ochre-six.vercel.app" }],
        destination: "https://onixframe.com/:path*",
        permanent: true,
      },
    ];
  },
  ...(isGitHubPages
    ? {
        output: "export",
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
