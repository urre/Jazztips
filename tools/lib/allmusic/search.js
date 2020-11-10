const puppeteer = require('puppeteer')

const Search = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(
		`https://www.allmusic.com/search/all/${encodeURIComponent('kind of blue')}`
	)

	await page.waitForTimeout(1000)

	const result = await page.evaluate(() => {
		let album = document.querySelector(
			'.search-results li.album .info .title a'
		)

		return album.href
	})

	await browser.close()
	return result
}

export default Search
