/** @type {import('next').NextConfig} */
const nextConfig = {
    ignoreBuildErrors: true,
    images: {
        domains: ['localhost', 'cdn.discordapp.com' ],
    },
}

module.exports = nextConfig
