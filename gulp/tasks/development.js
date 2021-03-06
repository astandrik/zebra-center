'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', ['clean'], function(cb) {

  global.isProd = false;

  runSequence(['styles', 'images', 'fonts', 'views', 'folders','vendors','ckStyles'], 'browserify', 'watch', cb);

});
