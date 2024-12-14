/** @type {import('next').NextConfig} */
import nextra from "nextra";
const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  defaultShowCopyCode: true,
});
const nextConfig = withNextra({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});

export default nextConfig;
