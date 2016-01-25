module.exports = function (config) {
  config.set({
    basePath : '',
    autoWatch : true,
    frameworks: ['jasmine'],
    browsers: ['PhantomJS2'],
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },
    plugins : [
      'karma-phantomjs2-launcher',
      'karma-jasmine',
    ],
    files: [
      'spec/*.js',
      '../fryr.js',

      {
        pattern: '../*.js',
        watched: true,
        served: true,
        included: false
      }
    ],

    reporters: ['progress'],
    colors: true,
    singleRun: true
  });
};
