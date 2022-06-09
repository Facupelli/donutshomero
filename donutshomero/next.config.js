/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  env: {
    TOKEN_SECRET_WORD: process.env.TOKEN_SECRET_WORD,
  },
};

module.exports = nextConfig;
