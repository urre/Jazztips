const fs = require('fs')
const { createCanvas, registerFont, loadImage } = require('canvas')
const fm = require('front-matter')
const glob = require('glob')
const path = require('path')
const readline = require('readline-sync')
const getUrls = require('get-urls')
const cloudinary = require('cloudinary')
const chalk = require('chalk')
const log = console.log
const insertLine = require('insert-line')
const open = require('open')
require('dotenv').config({ path: __dirname + `/../.env` })

// Cloudinary settings, read secrets
cloudinary.config({
	cloud_name: process.env.CLOUDNAME,
	api_key: process.env.APIKEY,
	api_secret: process.env.APISECRET,
})

// Get most recent file
const getMostRecentFile = (dir) => {
	const files = orderReccentFiles(dir)
	return files.length ? files[0] : undefined
}

// Order files
const orderReccentFiles = (dir) => {
	return fs
		.readdirSync(dir)
		.filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
		.map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
		.sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
}

// Wrap text in canvas
const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
	var words = text.split(' ')
	var line = ''

	for (var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' '
		var metrics = context.measureText(testLine)
		var testWidth = metrics.width
		if (testWidth > maxWidth && n > 0) {
			context.fillText(line, x, y)
			line = words[n] + ' '
			y += lineHeight
		} else {
			line = testLine
		}
	}
	context.fillText(line, x, y)
}

// Select file
const filename = getMostRecentFile('../_posts/')
const fileFrontmatter = fs.readFileSync(`../_posts/${filename.file}`, 'utf8')
const fileData = fm(fileFrontmatter)

if (!fileData.attributes.ogimage) {
	// Load image into the canvas and add text
	loadImage(fileData.attributes.image).then((image) => {
		// Settings
		const width = 1200
		const height = 630

		// Set font style and placement
		let fontSize = 64
		let lineHeight = fontSize * 1.3975
		let textArtistY = 120
		let textTitleY = textArtistY + 220

		const canvas = createCanvas(width, height)
		const context = canvas.getContext('2d')

		// Fill with white background color
		context.fillStyle = '#bdfbd5'
		context.fillRect(0, 0, canvas.width, canvas.height)

		// Add image to canvas
		context.drawImage(image, 40, 50, 600, 600)

		// Use custom font     c
		registerFont('./spectral/Spectral-Light.ttf', {
			family: 'Spectral',
		})

		if (fileData.attributes.artist.length > 20) {
			fontSize = 50
			lineHeight = fontSize * 1.275
			textArtistY = 140
			textTitleY = textArtistY + 240
		} else {
			fontSize = 64
		}

		context.font = `normal ${fontSize}pt Spectral`
		context.textAlign = 'left'
		context.textBaseline = 'top'

		context.fillStyle = '#fff'
		context.fillRect(550, 90, 700, 500)

		// Add text
		context.fillStyle = '#000'
		wrapText(
			context,
			`${fileData.attributes.artist}`,
			640,
			textArtistY,
			510,
			lineHeight
		)
		wrapText(
			context,
			`”${fileData.attributes.title}”`,
			640,
			textTitleY,
			510,
			lineHeight
		)

		// Add Jazztips green circle
		context.fillStyle = '#68d391'
		context.beginPath()
		context.arc(1080, 100, 50, 0, 2 * Math.PI)
		context.fill()

		const buffer = canvas.toBuffer('image/jpeg')
		fs.writeFileSync('./temp.jpg', buffer)

		/* Open in VS Code just to preview while testing */
		open('./temp.jpg', { app: 'Visual Studio Code' })

		// Upload image to Cloudinary, and add as front matter in markdown file
		const newImage = cloudinary.v2.uploader.upload(
			'./temp.jpg',
			function (error, result) {
				insertLine(`../_posts/${filename.file}`)
					.content(`ogimage: ${result.secure_url}`)
					.at(9)
					.then(function (err) {
						log(`${chalk.green(`✔️ Inserted ogimage front matter`)}`)
					})
			}
		)
	})
} else {
	log(`
	${chalk.yellow(`⚠️ ../_posts/${filename.file} already has ogimage frontmatter`)}
	`)
}
