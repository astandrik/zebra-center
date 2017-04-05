'use strict';

import config from '../config';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import handleErrors from '../util/handleErrors';
import browserSync from 'browser-sync';
var rename = require("gulp-rename");
import autoprefixer from 'gulp-autoprefixer';
var concatCss = require('gulp-concat-css');
import livereload from "../util/livereload";

gulp.task('styles', function () {

    const createSourcemap = !global.isProd || config.styles.prodSourcemap;

    return gulp.src(config.styles.src)
        .pipe(gulpif(createSourcemap, sourcemaps.init({
            loadMaps: true
        })))
        .pipe(sass({
            sourceComments: !global.isProd,
            outputStyle: global.isProd ? 'compressed' : 'nested',
            includePaths: config.styles.sassIncludePaths
        }))
        .on('error', handleErrors)
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe(gulpif(
            createSourcemap,
            sourcemaps.write(global.isProd ? './' : null)))
        .pipe(concatCss("styles/main.css"))
        .pipe(rename("styles/main."+config.version+".css"))
        .pipe(gulp.dest(config.styles.dest))
        .pipe(livereload());

});
