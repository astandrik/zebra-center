import gulp from 'gulp';

gulp.task('folders', function() {
  return gulp.src(['node/dbscripts/**/*'])
  .pipe(gulp.dest('build/dbscripts'));
})
