const gulp = require('gulp');
const cloudflare = require('gulp-cloudflare');
const config = require('../config').basePaths;

gulp.task('purge', function() {
    var options = {
        token: config.cloudflare.token,
        email: config.cloudflare.email,
        domain: config.cloudflare.domain
    };

    cloudflare(options);
    
});