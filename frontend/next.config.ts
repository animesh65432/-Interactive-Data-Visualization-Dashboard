import type { NextConfig } from "next";
const port = process.env.PORT || 3000;


const nextConfig: NextConfig = {
  /* config options here */
  serverRuntimeConfig: {
    port, // Ensures the server binds to the correct port
  },
};

export default nextConfig;
