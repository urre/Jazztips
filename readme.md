# [Jazztips](https://jazztips.se/)

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"/>
</a>

### Features

+ Static website built with [Jekyll](https://jekyllrb.com/)
+ [Instant search](https://jazztips.se/sok/)
+ Tagging [](https://jazztips.se/taggar/blade/)
+ Lazy loaded images using [bLazy](http://dinbror.dk/blog/blazy/)
+ Images delivered using [Cloudinary](https://cloudinary.com/)
+ Hosted on [Netlify](https://netlify.com)

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
