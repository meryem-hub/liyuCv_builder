/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
}

export default nextConfig