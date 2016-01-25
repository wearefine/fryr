module.exports = function (config) {
  config.set({
    basePath : '',
    autoWatch : true,
    frameworks: ['jasmine'],
    browsers: ['PhantomJS2'],
    plugins : [
      'karma-phantomjs2-launcher',
      'karma-jasmine',
    ],
    files: [
      'spec/*.js',
      '../fryr.js',
      {
        pattern: '../*.js',
        served: true,
        included: true
      }
    ],
    singleRun: true,
    reporters: ['progress'],
    colors: true
  });
};
