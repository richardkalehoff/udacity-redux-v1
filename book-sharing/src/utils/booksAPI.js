const api = process.env.REDUX_APP_BOOKS_API_URL || 'http://localhost:5002'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export function get (bookId) {
  return fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
}

export function getAll (bookIds) {
  return Promise.all(bookIds.map(get))
}

export function search (query, maxResults) {
  return fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  })
  .then((res => res.json()))
  .then(({ books }) => books)
}
