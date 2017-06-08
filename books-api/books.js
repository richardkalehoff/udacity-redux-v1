require('isomorphic-fetch')
const invariant = require('invariant')

const apiKey = process.env.GOOGLE_BOOKS_API_KEY

invariant(
  apiKey,
  'Missing $GOOGLE_BOOKS_API_KEY environment variable'
)

const api = 'https://www.googleapis.com/books/v1'

function formatBook ({ volumeInfo }, id) {
  const { title, authors, publisher, imageLinks, averageRating, description, publishedDate } =volumeInfo

  return {
    title,
    authors,
    publisher,
    averageRating,
    description,
    publishedDate,
    thumbnail: imageLinks.thumbnail,
    id,
  }
}


const get = (token, id) =>
  fetch(`${api}/volumes/${id}?key=${apiKey}`)
    .then(res => res.json())
    .then((book) => formatBook(book, id))

const getAll = (token, bookIds) => {
  return Promise.all(bookIds.map(bookId => get(token, bookId)))
}

const search = (token, query, maxResults = 20) =>
  fetch(`${api}/volumes?key=${apiKey}&q=${encodeURIComponent(query)}&maxResults=${maxResults}&fields=items(id,volumeInfo)`)
    .then(res => res.json())

module.exports = {
  get,
  getAll,
  search
}
