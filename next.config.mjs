/** @type {import('next').NextConfig} */
import nextra from "nextra";
const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});
const nextConfig = withNextra();

export default nextConfig;
