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
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true
  });
};
