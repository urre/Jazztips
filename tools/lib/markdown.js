const fs = require('fs-extra')
const slugify = require('slugify')

const saveMarkdown = async (credits) => {
	console.log(credits)

	// const folderName = `./posts/${credits.date}-${slugify(credits[1], {
	// 	lower: true,
	// })}`

	// let frontmatter = `
	// credits -\n
	// `

	// for (let credit of credits[2]) {
	// 	frontmatter.concat(`- { name: ${credit.name}, instrument: ${credit.credit}`)
	// }

	// console.log(frontmatter)

	// Save file
	// fs.writeFile(outputFile, YML, (err) => {
	// 	if (err) {
	// 		return console.error(err)
	// 	}
	// 	console.log(`✅ Saved ${outputFile}`)
	// })

	// Copy to website project
	// if (!fs.existsSync(markdownOutputPath)) {
	// fs.copy('./posts/', markdownOutputPath, { clobber: false }, function (err) {
	// 	if (err) {
	// 		console.error(err)
	// 	}
	// })
	// }
}

export default saveMarkdown
