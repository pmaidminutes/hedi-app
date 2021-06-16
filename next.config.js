module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    // HACK do not forget to add to `landingPagePaths` too
    locales: ['de', 'en', 'fa'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'de',
  },
  images: {
    domains: [
      'assets.projekt-hedi.de',
      'testassets.projekt-hedi.de',
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!dev) {
      // ignore all files in a playground folder (tsx and api/ts)
      // TODO enable this, once we find a fix for the build error
      // while this is not executed, remember to remove playground for any public build
      //config.plugins.push(new webpack.IgnorePlugin({resourceRegExp: /\/playground\//}));
    }
    return config;
  },
}