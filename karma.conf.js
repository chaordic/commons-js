const webpackConfig = require('./webpack.config');

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      './test/**/*.spec.js',
    ],
    exclude: [],
    preprocessors: {
      './test/**/*.spec.js': ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: true,
    concurrency: Infinity,
  });
};
