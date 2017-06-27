const api = process.env.REDUX_APP_BOOKS_API_URL || 'http://localhost:5002'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export function getBook (bookId) {
  return fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
}

export function getAllBooks (bookIds) {
  return Promise.all(bookIds.map(getBook))
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

export function getUsers () {
  return fetch(`${api}/users`, { headers })
    .then((res) => res.json())
    .then((data) => data.users)
}

