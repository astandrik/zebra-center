import gulp from 'gulp';

gulp.task('vendors', function () {
    return gulp.src(['node_modules/angular-gridster/dist/*',
                   'node_modules/angular-ui-tree/dist/*',
                   'node_modules/javascript-detect-element-resize/jquery.resize.js',
                   'app/external_libs/FancyBox-v2.1.5/lib/jquery.mousewheel-3.0.6.pack.js',
                   'app/external_libs/FancyBox-v2.1.5/source/jquery.fancybox.pack.js',
                   'app/external_libs/FancyBox-v2.1.5/source/helpers/jquery.fancybox-buttons.js',
                   'app/external_libs/FancyBox-v2.1.5/source/helpers/jquery.fancybox-media.js',
                   'app/external_libs/FancyBox-v2.1.5/source/helpers/jquery.fancybox-thumbs.js'])
        .pipe(gulp.dest('build/vendors'));
})
