const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const fm = require('front-matter')
const glob = require('glob')
const getUrls = require('get-urls')
const cloudinary = require('cloudinary')
require('dotenv').config({ path: __dirname + `/../.env` })

// Cloudinary settings, read secrets
cloudinary.config({
	cloud_name: process.env.CLOUDNAME,
	api_key: process.env.APIKEY,
	api_secret: process.env.APISECRET,
})

// Get newest file
const newestFile = glob
	.sync('../_posts/*md')
	.map((name) => ({ name, ctime: fs.statSync(name).ctime }))
	.sort((a, b) => b.ctime - a.ctime)[0].name

// Read front matter in markdown file
const fileFrontmatter = fs.readFileSync(newestFile, 'utf8')
const fileData = fm(fileFrontmatter)
let artistYPosition = '250'

// Format artist name
const formatArtist = (artist) => {
	if (artist.length > 20) {
		const artistName = artist.split(' ')
		let artistNameFormatted = ''

		for (let artistPart of artistName) {
			artistNameFormatted += `${artistPart}\n`
		}

		artistYPosition = '150'

		return artistNameFormatted
	}
}

// Load image into the canvas and add text
loadImage(fileData.attributes.image).then((image) => {
	const width = 1200
	const height = 630

	const canvas = createCanvas(width, height)
	const context = canvas.getContext('2d')
	context.fillStyle = '#fff'

	context.fillRect(0, 0, canvas.width, canvas.height)

	context.drawImage(image, 100, 115, 400, 400)

	context.font = 'regular 42pt Georgia'
	context.textAlign = 'left'
	context.textBaseline = 'top'

	const text = `${formatArtist(fileData.attributes.artist)}\n”${
		fileData.attributes.title
	}”`

	context.fillRect(500, 0, 700, 630)

	context.fillStyle = '#111'
	context.fillText(text, 600, artistYPosition)

	context.fillStyle = '#68d391'
	context.beginPath()
	context.arc(480, 180, 50, 0, 2 * Math.PI)
	context.fill()

	const buffer = canvas.toBuffer('image/jpeg')
	fs.writeFileSync('./test.jpg', buffer)

	// Upload file to Cloudinary
	const newImage = cloudinary.v2.uploader.upload('./test.jpg', function (
		error,
		result
	) {
		// Replace image in file
		fs.readFile(newestFile, 'utf8', function (err, data) {
			if (err) {
				return console.log(err)
			}

			const URLs = getUrls(data)
			const oldImage = Array.from(URLs)[0]
			var newfileData = data.replace(oldImage, result.secure_url)

			console.log(newfileData)

			// fs.writeFile(newestFile, newfileData, 'utf8', function (err) {
			// 	if (err) return console.log(err)
			// })
		})
	})
})
