/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
    REFRESH_TOKEN_ENDPOINT: process.env.REFRESH_TOKEN_ENDPOINT,
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  },
};

module.exports = nextConfig;
