var gulp = require('gulp');
var async = require('async');
var inject = require('gulp-inject');

function runSynchronized(tasks, callback){
    var sync = tasks.map(function(task){
        return function(callback){
            gulp.run(task, function(err){
                callback(err);
            });
        };
    });
    async.series(sync, callback);
}

gulp.task('copy:dist', function () {
  return gulp.src('./dist/**')
    .pipe(gulp.dest('./mobile/www/'));
});

gulp.task('build:mobile', function () {
    var target = gulp.src('./mobile/www/index.html');
    var sources = gulp.src(['./mobile/www/ionic/*.js', './mobile/www/ionic/*.css'], {read: false});
    return target.pipe(inject(sources, {relative: true})).pipe(gulp.dest('./mobile/www/'));
});

/* The default task */
gulp.task('mobile', function() {
    runSynchronized(['build:dev', 'copy:dist', 'build:mobile']);
});
