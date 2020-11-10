const puppeteer = require('puppeteer')

const Album = async (url) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(`${url}/credits`)

	await page.waitForTimeout(1000)

	const result = await page.evaluate((url) => {
		const album = {}

		album.artist = document
			.querySelector('hgroup h2.album-artist')
			.innerText.trim()
		album.title = document
			.querySelector('hgroup h1.album-title')
			.innerText.trim()
		album.image = document.querySelector('.media-gallery-image').src
		album.date = document
			.querySelector('.release-date span')
			.textContent.split(',')[1]
			.trim()

		return album
	}, url)

	await browser.close()
	return result
}

export default Album
