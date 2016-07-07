import gulp from 'gulp';

gulp.task('vendors', function() {
  return gulp.src(['node_modules/angular-gridster/dist/*','node_modules/javascript-detect-element-resize/jquery.resize.js'])
  .pipe(gulp.dest('build/vendors'));
})
