/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    TOKEN_SECRET_WORD: process.env.TOKEN_SECRET_WORD,
  }
}

module.exports = nextConfig
