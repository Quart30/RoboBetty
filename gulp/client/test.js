var gulp = require('gulp'),
    path = require('path');
    karma = require('karma').server;


/*
 * This will run the test for client side
 * @precon This requires that we build our bundle.js
 * first
 */
gulp.task('test:client', ['build:dev'], function(done){
  karma.start({
    configFile: path.join(process.cwd(), 'karma.conf.js'),
    singleRun: true
  }, done);
});
