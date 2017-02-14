import gulp from 'gulp';

gulp.task('folders', function() {
  return gulp.src(['node/dbscripts/**/*'])
  .pipe(gulp.dest('build/dbscripts'));
})


gulp.task('ckStyles', function() {
  return gulp.src(['node/dbscripts/ckStyles.css'])
  .pipe(gulp.dest('build/css/styles'));
})
