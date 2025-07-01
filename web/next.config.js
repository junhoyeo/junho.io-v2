const webpack = require('webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  // transpilePackages: ['next-mdx-remote'],
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['pbs.twimg.com', 'www.bento.finance'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    );
    return config;
  },
  // redirect /qr to https://www.youtube.com/watch?v=dQw4w9WgXcQ
  async redirects() {
    return [
      {
        source: '/qr',
        destination: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        permanent: false,
      },
    ];
  },
});
