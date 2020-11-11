const fs = require('fs')
const { createCanvas, registerFont, loadImage } = require('canvas')
const fm = require('front-matter')
const glob = require('glob')
const readline = require('readline-sync')
const getUrls = require('get-urls')
const cloudinary = require('cloudinary')
const open = require('open')
require('dotenv').config({ path: __dirname + `/../.env` })

// Cloudinary settings, read secrets
cloudinary.config({
	cloud_name: process.env.CLOUDNAME,
	api_key: process.env.APIKEY,
	api_secret: process.env.APISECRET,
})

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
let name = readline.question('Filename of post to create an OG image for: ')
const filename = `../_posts/${name}`

const fileFrontmatter = fs.readFileSync(filename, 'utf8')
const fileData = fm(fileFrontmatter)
let artistYPosition = '250'

// Load image into the canvas and add text
loadImage(fileData.attributes.image).then((image) => {
	const width = 1200
	const height = 630

	const canvas = createCanvas(width, height)
	const context = canvas.getContext('2d')
	context.fillStyle = '#fff'

	context.fillRect(0, 0, canvas.width, canvas.height)

	context.drawImage(image, 100, 115, 400, 400)

	registerFont('./spectral/Spectral-Light.ttf', {
		family: 'Spectral',
	})

	context.font = 'normal 44pt Spectral'
	context.textAlign = 'left'
	context.textBaseline = 'top'

	context.fillRect(500, 0, 700, 630)

	context.fillStyle = '#111'

	wrapText(
		context,
		`${fileData.attributes.artist}\n\n”${fileData.attributes.title}”`,
		600,
		200,
		500,
		60
	)

	context.fillStyle = '#68d391'
	context.beginPath()
	context.arc(1080, 100, 50, 0, 2 * Math.PI)
	context.fill()

	const buffer = canvas.toBuffer('image/jpeg')
	fs.writeFileSync('./temp.jpg', buffer)

	open('./temp.jpg', { app: 'Visual Studio Code' })
	open(filename, { app: 'Visual Studio Code' })

	// Upload file to Cloudinary
	const newImage = cloudinary.v2.uploader.upload('./temp.jpg', function (
		error,
		result
	) {
		// Replace image in file
		fs.readFile(filename, 'utf8', function (err, data) {
			if (err) {
				return console.log(err)
			}

			const URLs = getUrls(data)
			const oldImage = Array.from(URLs)[0]
			var newfileData = data.replace('opengraph', result.secure_url)

			fs.writeFile(filename, newfileData, 'utf8', function (err) {
				if (err) return console.log(err)
			})
		})
	})
})
