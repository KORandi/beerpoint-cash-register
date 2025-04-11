// @ts-check
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APP_NAME: "Hospodský systém",
    VERSION: "0.1.0",
  },
};

export default nextConfig;
