var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var config      = require('../config').basePaths;

/*-------------------------------------------------------------------
Wait for jekyll-build, then launch the Server
-------------------------------------------------------------------*/
gulp.task("browser-sync", ["sass", "js", "jekyll-build"], function() {
    browserSync({
        server: {
            baseDir: config.site.dist
        },
        open: false,
        notify: true,
        notify: {
            styles:  [
                "display: none",
                "padding: .5rem",
                "font-family: sans-serif",
                "position: fixed",
                "font-size: 0.85rem",
                "z-index: 9999",
                "bottom: 0px",
                "right: 0px",
                "background-color: #333",
                "margin: 0",
                "color: white",
                "text-align: center"
            ]
        }
    });
});
