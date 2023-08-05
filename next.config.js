/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["es", "en"],
    localeDetection: false,
    defaultLocale: "es",
  },
};

module.exports = nextConfig;
