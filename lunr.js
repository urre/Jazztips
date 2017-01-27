---

---

// Index
var index = lunr(function () {
  this.field('title', {boost: 10})
  this.field('content')
  this.field('artist')
  this.field('label')
  this.field('tags')
  this.ref('id')
});

{% assign count = 0 %}{% for post in site.posts %}
index.add({
  title: {{post.title | jsonify}},
  artist: {{post.artist | jsonify}},
  content: {{post.content | strip_html | jsonify}},
  label: {{post.skivbolag | jsonify}},
  tags: {{post.tags | jsonify}},
  id: {{count}}
});{% assign count = count | plus: 1 %}{% endfor %}

// Build reference data
var store = [{% for post in site.posts %}{
  "title": {{post.title | jsonify}},
  "artist": {{post.artist | jsonify}},
  "link": {{ post.url | jsonify }},
  "label": {{ post.skivbolag | jsonify }},
  "image": {{ post.image | jsonify }},
  "date": {{ post.date | date: '%B %-d, %Y' | jsonify }},
  "excerpt": {{ post.content | strip_html | truncatewords: 20 | jsonify }}
}{% unless forloop.last %},{% endunless %}{% endfor %}]

// Builds simple search

document.addEventListener('DOMContentLoaded', function() {

  var searchfield = document.querySelector('.searchfield');
  var resultdiv = document.querySelector('.searchresults');
  
  searchfield.addEventListener('keyup', function(event) {
  
    event.preventDefault();
  
    var query = this.value;
    var result = index.search(query);
    resultdiv.innerHTML = '';

    var searchcount = document.querySelector('.searchcount');
    searchcount.innerHTML = 'Hittade '+result.length+' skivor';
    
    for (var item in result) {
      var ref = result[item].ref;
      var searchitem = document.createElement('div');
      searchitem.className = "column col-4";
      searchitem.innerHTML = '<div class="card"><a class="card-link" href="' + store[ref].link + '"><div class="card-image"><div class="loading"><img class="b-lazy img-responsive" src="' + store[ref].image + '" data-src="' + store[ref].image + '" alt="' + store[ref].title + '"/></div></div><div class="card-header"><h4 class="card-title">' + store[ref].title + '</h4><h6 class="card-meta">{{post.skivbolag}}</h6></div></a></div>';
      resultdiv.appendChild(searchitem);


      setTimeout(function(){
        bLazy.revalidate();
      }, 500);



    }
  });  
});

