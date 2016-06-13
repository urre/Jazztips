/*-------------------------------------------------------------------
Paths
-------------------------------------------------------------------*/

module.exports = {
  basePaths : {
    assets: {
      src: './_assets/',
      dist: './assets/'
    },
    vendor: {
      base: './js/vendor/',
    },
    scripts: {
      src: './_assets/js/**/*.{js}',
      base: './_assets/js/',
      dist: './assets/'
    },
    bower: {
      base: './bower_components/',
    },
    npm: {
      base: './node_modules/',
    },
    fonts: {
      src: './_assets/fonts/'
    },
    scss: {
      src: './_assets/scss/**/*.{sass,scss}',
      base: './_assets/scss/',
      dist: './assets/',
    },
    html: {
      base: './',
      dist: './'
    },
    jekyll: {
      html: './**/*.html',
      posts: '_posts/*.md',
      nonsitehtml: '!_site/**/*.html'
    },
    site: {
      posts: './_posts/',
      dist: './_site/',
      css: './_site/assets/css/',
      js: './_site/assets/js/',
      images: './_site/assets/images/',
      assets: './_site/assets/',
    },
    consid: {
      svn: '/Users/urbansanden/projects/hemmafonster-consid/Hemmafonster-HTML/trunk'
    }
  }
};
