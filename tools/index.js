import Search from './lib/allmusic/search'
import Album from './lib/allmusic/album'
import UploadImage from './lib/uploadimage'
import Musicians from './lib/allmusic/musicians'
import saveMarkdown from './lib/markdown'

const getCredits = async () => {
	try {
		// A URL as a string
		const search = await Search()

		// An object
		const album = await Album(search)

		// An array
		const musicians = await Musicians(search)
		// return [...Object.entries(album), ...musicians]

		// Upload image to cloudinary
		const image = await UploadImage(album)

		return image

		// Construct a new object with all metadata
		// return Object.assign(album, musicians)
		// return album
	} catch (e) {
		return e
	}
}

const scrapeAndSave = getCredits().then(async (data) => {
	try {
		console.log(JSON.stringify(data, null, 3))
		// let markdown = await saveMarkdown(credits)
	} catch (err) {
		console.error(err)
	}
})

// https://twitter.com/JS_Cheerleader/status/1249167286629478402
