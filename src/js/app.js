import lunr from 'lunr'

const searchfield = document.querySelector('.form-input')
const resultdiv = document.querySelector('.albumcontainer')
const searchcount = document.querySelector('.searchcount')
let timeoutId


const searchLoader = document.querySelector('.form-icon')

let index = lunr(function() {
  this.ref('id')
  this.field('title', {boost: 10})
  this.field('artist')
  this.field('link')
  this.field('image')
  this.field('content')
  this.field('label')
  this.field('tags')
})

for (let key in window.store) {
  index.add({
    'id': key,
    'title': window.store[key].title,
    'artist': window.store[key].artist,
    'link': window.store[key].link,
    'image': window.store[key].image,
    'content': window.store[key].content,
    'label': window.store[key].label,
    'tags': window.store[key].tags,
  })
}

const getTerm = function() {
  if(searchfield) {

    searchfield.addEventListener('keyup', function(event) {
      event.preventDefault()
      searchLoader.style.opacity = 1
      const query = this.value

      doSearch(query)
    })
  }
}

const getQuery = () => {
  const parser = document.createElement('a')
  parser.href = window.location.href

  if(parser.href.includes('=')) {
    const searchquery = decodeURIComponent(parser.href.substring(parser.href.indexOf('=') + 1))
      searchfield.setAttribute('value', searchquery)

      doSearch(searchquery)
  }

}

const updateUrlParameter = (value) => {
  window.history.pushState('', '', `?s=${encodeURIComponent(value)}`);
}

const doSearch = query => {
  const result = index.search(query)
  resultdiv.innerHTML = ''
  searchcount.innerHTML = `Hittade ${result.length} skivor`

  setTimeout(() => {
    searchLoader.style.opacity = 0
  }, 500)

  updateUrlParameter(query)
  showResults(result)

}

const showResults = (result) => {

  clearTimeout(timeoutId)
  timeoutId = setTimeout(function() {

    for (let item of result) {
      const ref = item.ref

      const searchitem = document.createElement('div')

      searchitem.className = 'column'
      searchitem.innerHTML = `<div class='card mb2'><a class='card-link' href='${window.store[ref].link}'><div class='cover'><img class='img-responsive' src='${window.store[ref].image}' src='${window.store[ref].image}' alt='${window.store[ref].title}'/></div><div class='card-header'><h4 class='card-title'>${window.store[ref].artist} - ${window.store[ref].title}</h4><h6 class='card-meta'>${window.store[ref].label}</h6></div></a></div>`

      resultdiv.appendChild(searchitem)

      setTimeout(() => {
        bLazy.revalidate()
      }, 300)

    }
  }, 300)

}


getTerm()
getQuery()
