# [Jazztips](https://jazztips.se/)

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"/>
</a>

### Features

+ Static website built with [Jekyll](https://jekyllrb.com/)
+ [Instant search](https://jazztips.se/sok/)
+ [Tagging](https://jazztips.se/taggar/blade/)
+ Pagination
+ Images delivered using [Cloudinary](https://cloudinary.com/)
+ Hosted on [Netlify](https://netlify.com)

## Prerequisites

+ [Docker](https://docker.com)

## Run

    docker-compose up

> This will open your default browser at [http://0.0.0.0:4000/](http://0.0.0.0:4000/)

## Get music data for a new post

    npm run new

> You'll need a `.env` file with Cloudinary API keys, check `.env-example`

## Deploy

Netlify will automatically deploy from the master branch 😎
