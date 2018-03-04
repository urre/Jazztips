# [Jazztips](https://jazztips.se/)

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"/>
</a>

### Features

+ Static website built with [Jekyll](https://jekyllrb.com/)
+ [Instant search](https://jazztips.se/sok/)
+ [Tagging](https://jazztips.se/taggar/blade/)
+ Fingerprinted asset pipeline using [Jekyll Assets](https://envygeeks.io/docs/jekyll-assets)
+ [Babel](https://babeljs.io/) - for writing next generation JavaScript. Using [@babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)
+ Pagination
+ Lazy loaded images using [bLazy](http://dinbror.dk/blog/blazy/)
+ Images delivered using [Cloudinary](https://cloudinary.com/)
+ Hosted on [Netlify](https://netlify.com)

## Prerequisite

+ [Ruby](https://www.ruby-lang.org/en/)
+ [npm](https://www.npmjs.com/)
+ [Yarn](https://yarnpkg.com/lang/en/)

## Setup

    bundle install

    yarn install

## Run

    yarn run start

> This will open your default browser at [http://localhost:3000/](http://localhost:3000)

## Get music data for a new post

    npm run new

> You'll need a `.env` file with Cloudinary API keys, check `.env-example`

## Deploy

Netlify will automatically deploy from the master branch 😎
