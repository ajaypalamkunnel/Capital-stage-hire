/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nnkfeokdsezhquuaxdeh.supabase.co',
      },
    ],
  },
};

export default nextConfig;
