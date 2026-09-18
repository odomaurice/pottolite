import type { NextConfig } from "next";

// No images.remotePatterns, on purpose: the only remote images (the Cloudinary
// plan and app icons) go through cloudinaryLoader and never touch Next's
// optimizer. See src/lib/cloudinary.ts for why.
const nextConfig: NextConfig = {};

export default nextConfig;
