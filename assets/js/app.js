const searchfield = document.querySelector('.searchform input')
const resultdiv = document.querySelector('.albumcontainer')
const searchcount = document.querySelector('.searchcount')
let timeoutId
var index
index = lunr(function () {
	this.ref('id')
	this.field('title', { boost: 10 })
	this.field('artist')
	this.field('link')
	this.field('image')
	this.field('content')
	this.field('label')
	this.field('tags')
	for (let key in window.store) {
		this.add({
			id: key,
			title: window.store[key].title,
			artist: window.store[key].artist,
			link: window.store[key].link,
			image: window.store[key].image,
			content: window.store[key].content,
			label: window.store[key].label,
			tags: window.store[key].tags,
		})
	}
})

console.log(index)

const getTerm = function () {
	if (searchfield) {
		searchfield.addEventListener('keyup', function (event) {
			event.preventDefault()

			const query = this.value

			doSearch(query)
		})
	}
}

const getQuery = () => {
	const parser = document.createElement('a')
	parser.href = window.location.href

	if (parser.href.includes('=')) {
		const searchquery = decodeURIComponent(
			parser.href.substring(parser.href.indexOf('=') + 1)
		)
		searchfield.setAttribute('value', searchquery)

		doSearch(searchquery)
	}
}

const updateUrlParameter = (value) => {
	window.history.pushState('', '', `?s=${encodeURIComponent(value)}`)
}

const doSearch = (query) => {
	const result = index.search(query)
	resultdiv.innerHTML = ''
	searchcount.innerHTML = `Hittade ${result.length} skivor`

	updateUrlParameter(query)
	showResults(result)
}

const showResults = (result) => {
	clearTimeout(timeoutId)
	timeoutId = setTimeout(function () {
		for (let item of result) {
			const ref = item.ref

			const searchitem = document.createElement('div')

			searchitem.className = 'block py-4'
			searchitem.innerHTML = `<a class='' href='${window.store[ref].link}'><img class='object-cover rounded-md border-solid border-opacity-50 border' src='${window.store[ref].image}' src='${window.store[ref].image}' alt='${window.store[ref].title}'/></div><div class="py-4"><div class='card-header'><h2 class='text-xl'>${window.store[ref].artist} - ${window.store[ref].title}</h2><h4 class='text-sm uppercase mt-2'>${window.store[ref].label}</h4></div></div></a>`

			resultdiv.appendChild(searchitem)
		}
	}, 300)
}

getTerm()
getQuery()
