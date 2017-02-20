import gulp from 'gulp';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import config from '../config';
import browserSync from 'browser-sync';
const reload = browserSync.reload;
import util from 'gulp-util';

import rollup from 'gulp-rollup';
import rollupIncludePaths from 'rollup-plugin-includepaths';

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const includePathOptions = {
  paths: [config.basePaths.scripts.base]
};

gulp.task("js", () => {
  gulp.src([
    config.basePaths.scripts.base + "main.js"
  ])
    .pipe(plumber())
    .on("error", (err) => {
      console.log(err.message);
    })
    .pipe(rollup({
      entry: config.basePaths.scripts.base + "main.js",
      impliedExtensions: ['.js'],
      allowRealFiles: true,
      sourceMap: false,
      format: 'umd',
      plugins: [
        babel({
          exclude: 'node_modules/**',
          presets: ['es2015-rollup'],
          babelrc: false
        }),
        resolve({
          jsnext: true,
          main: true,
          browser: true,
        }),
        commonjs(),
        rollupIncludePaths(includePathOptions)
      ]
    }))
    .pipe(gulp.dest(config.basePaths.scripts.dist))
    .pipe(gulp.dest(config.basePaths.site.js))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});
