module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['20.203.179.186', '20.203.179.186:1337'],
  },
  i18n: {
    locales: ['de'],
    defaultLocale: 'de',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
        // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.resolve.fallback = {
            fs: false,
            module: false,
            process: require.resolve("process/browser"),
        }
    }

    return config;
  }
}
