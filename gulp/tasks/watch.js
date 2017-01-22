'use strict';

import config from '../config';
import gulp   from 'gulp';
import livereload from "../util/livereload";

gulp.task('watch', function() {
  livereload.listen();
  global.isWatching = true;
  // Scripts are automatically watched and rebundled by Watchify inside Browserify task
  //gulp.watch(config.scripts.src, ['eslint']);
  gulp.watch(config.styles.watchSrc,  ['styles']);
  gulp.watch(config.images.src,  ['images']);
  gulp.watch(config.fonts.src,   ['fonts']);
  gulp.watch(config.views.watch, ['views']);

});
