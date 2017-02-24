var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var size = require('gulp-size');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var config  = require('../config');

/*-------------------------------------------------------------------
Watch scss files for changes & recompile
Watch html/md files, run jekyll & reload BrowserSync
-------------------------------------------------------------------*/
gulp.task("watch", ['sass', 'js', 'browser-sync'], function () {
    gulp.watch([config.basePaths.scss.src], ["sass"]);
    gulp.watch([config.basePaths.assets.src + "/js/main.js"], ["js"], ["bs-reload"], ["jekyll-rebuild"]);
    gulp.watch([config.basePaths.jekyll.html], ["jekyll-rebuild"], ["bs-reload"]);
    gulp.watch([config.basePaths.html.base+'lunr.js'], ["jekyll-rebuild"], ["bs-reload"]);
});
