const webpack = require('webpack');
const withTM = require('next-transpile-modules')(['ui']);

module.exports = withTM({
  reactStrictMode: true,
  compiler: {
    emotion: true,
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
});
