var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var size = require('gulp-size');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var config  = require('../config').basePaths;

/*-------------------------------------------------------------------
Watch scss files for changes & recompile
Watch html/md files, run jekyll & reload BrowserSync
-------------------------------------------------------------------*/
gulp.task("watch", ['sass', 'js', 'browser-sync'], function () {
    gulp.watch([config.scss.src], ['sass'], ['bs-reload']);
    gulp.watch([config.scripts.base+"main.js"], ["js"], ["jekyll-rebuild"], ["bs-reload"]);
    gulp.watch([config.jekyll.html], ["jekyll-rebuild"], ["bs-reload"]);
    gulp.watch([config.html.base+'lunr.js'], ["jekyll-rebuild"], ["bs-reload"]);
});
