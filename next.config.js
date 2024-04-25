const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV !== 'development',
    },
};

const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    // sw: "service-worker.js",
    // customWorkerDir: path.resolve(".src/lib/service-worker.js"),
    // runtimeCaching
});

module.exports = withPWA(nextConfig);