var gulp = require('gulp');

/* This will copy all our assets i.e. assets folder
 * to the dist folder.
 */
gulp.task('copy:assets', function () {
  return gulp.src('./client/assets/**')
    .pipe(gulp.dest('./dist/'));
});

/* This will copy all our bower dependencies
 * to the dist folder
 */
gulp.task('copy:bower-components', function () {
  return gulp.src('./client/bower_components/**')
    .pipe(gulp.dest('./dist/bower_components/'));
});

/* This will copy all our views
 * to the dist folder
 */
gulp.task('copy:views', function () {
  return gulp.src([ './client/app/**/*.html'])
    .pipe(gulp.dest('./dist/views/'));
});
