const gulp = require('gulp');
const size = require('gulp-size');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const header = require('gulp-header');
const plumber = require('gulp-plumber');
const config  = require('../config').basePaths;
const browserSync = require('browser-sync');
const reload = browserSync.reload;

gulp.task("js", function() {
	gulp.src([
		config.bower.base+"bLazy/blazy.min.js",
		config.scripts.base+"main.js"
		])
	.pipe(plumber())
	.on("error", function(err) {
		console.log(err.message);
	})
	.pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest(config.scripts.dist))
    .pipe(gulp.dest(config.site.js))
    .pipe(browserSync.reload({stream:true, once: true}));

});
