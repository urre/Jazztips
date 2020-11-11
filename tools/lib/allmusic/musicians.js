const puppeteer = require('puppeteer')

const Musicians = async (url) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(`${url}/credits`)

	await page.waitForTimeout(1000)

	const result = await page.evaluate((url) => {
		var Obj = {
			musicians: [],
		}

		let artistTable = Array.from(document.querySelectorAll('.credits table tr'))
		let artists = artistTable

			.filter((element) => {
				if (
					element
						.querySelector('.credit')
						.innerText.match(
							/Credit|Producer|Packaging|Photography|Art|Liner|Mastering|Mixing|A&R|Aassistant|Remixing|Director|Project|Engineer|Lettering|Marketing|Readings|Graphic|Management|Reissue/g
						)
				) {
					return false
				} else {
					return element
				}
			})
			.map((element) => {
				return {
					name: element.querySelector('.artist').innerText,
					instrument: element
						.querySelector('.credit')
						.innerText.replace('Main Personnel', '')
						.replace('Sax (Tenor)', 'Saxofon')
						.replace('Sax (Alto)', 'Saxofon')
						.replace('Drums', 'Trummor')
						.replace('Bass', 'Bas')
						.replace('Double', '')
						.replace('Electric', 'El')
						.replace('Saxophone', 'Saxofon')
						.replace('Guitar', 'Gitarr')
						.replace(', ', '')
						.replace(',', '')
						.trim(),
				}
			})

		Obj['musicians'].push(artists)

		return Obj
	}, url)

	await browser.close()
	return result
}

export default Musicians
