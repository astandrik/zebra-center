import gulp from 'gulp';

gulp.task('vendors', function() {
  return gulp.src(['node_modules/gridster/dist/jquery.gridster.min.js','node_modules/gridster/dist/jquery.gridster.min.css'])
  .pipe(gulp.dest('build/vendors'))
})
