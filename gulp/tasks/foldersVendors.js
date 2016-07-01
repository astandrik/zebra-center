import gulp from 'gulp';

gulp.task('folders', function() {
  return gulp.src(['node_modules/angular-ckeditor/bower_components/ckeditor/**/*'])
  .pipe(gulp.dest('build/vendors/ckeditor'));
})
