import gulp from 'gulp';

gulp.task('vendors', function () {
    return gulp.src(['node_modules/angular-gridster/dist/*',
                   'node_modules/angular-ui-tree/dist/*'])
        .pipe(gulp.dest('build/vendors'));
})
