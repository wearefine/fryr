module.exports = function (config) {
  config.set({
    basePath : '',
    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['Chrome'],
    plugins : [
      'karma-chrome-launcher',
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
