// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable image optimization
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],

    
    // If you're loading images from external domains, add them here
    domains: [
      // 'example.com',
      // 'cdn.example.com'
    ],
    
    // For local images, you can also configure sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

   // Enable static file serving
  trailingSlash: false,
  // Add this if you're using standalone mode
  output: 'standalone',
}

module.exports = nextConfig