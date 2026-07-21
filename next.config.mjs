/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack: (config, { dev }) => {
    // Disable the on-disk webpack cache in dev only. On Windows the cache's
    // atomic rename ('*.pack.gz_' -> '*.pack.gz') intermittently fails (antivirus /
    // file locking), corrupting the build and causing chunk 404s. Production builds
    // keep caching for speed.
    if (dev) config.cache = false;
    return config;
  },
};

export default nextConfig;
