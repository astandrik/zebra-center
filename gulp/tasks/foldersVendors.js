import gulp from 'gulp';

gulp.task('folders', function() {
  return gulp.src(['node/dbscripts/**/*'])
  .pipe(gulp.dest('build/dbscripts'));
})


gulp.task('ckStyles', function() {
  return gulp.src(['node/dbscripts/ckStyles.css'])
  .pipe(gulp.dest('build/css/styles'));
})

gulp.task('sitemap', function() {
  return gulp.src(['sitemap.xml'])
  .pipe(gulp.dest('build'));
})
