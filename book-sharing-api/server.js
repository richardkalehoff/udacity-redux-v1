require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config')
const books = require('./books')
const users = require('./users')

const app = express()

if (process.env.NODE_ENV !== 'production')
  app.use(morgan('dev'))

app.use(express.static('public'))
app.use(cors())

app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the Book Lender API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /books/:id
    POST /books { bookIds }
    POST /search { query, maxResults }

    GET /users
  </pre>
  `

  res.send(help)
})

app.use((req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
    })
  }
})

app.get('/books/:id', (req, res) => {
  const { id } = req.params

  books.get(req.token, id).then(
    (book) => res.send(book),
    (error) => {
      console.error(error)

      res.status(500).send({
        error: `There was an error fetching book ${id}`
      })
    }
  )
})

app.post('/books', bodyParser.json(), (req, res) => {
  const bookIds = req.body.bookIds

  if (Array.isArray(bookIds) === false) {
    return res.status(403).send({
      error: 'Please provide an array of book ids.'
    })
  }

  books.getAll(req.token, bookIds)
    .then(
      (books) => books.reduce((bookMap, book) => {
        bookMap[book.id] = book
        return bookMap
      }, {}),
      (error) => {
        console.error(error)

        res.status(500).send({
          error: 'There was an error retrieving all books'
        })
      }
    )
})

app.post('/search', bodyParser.json(), (req, res) => {
  const { query, maxResults } = req.body

  if (query) {
    books.search(req.token, query, maxResults).then(
      (books) => res.send({ books }),
      (error) => {
        console.error(error)

        res.status(500).send({
          error: 'There was an error performing your search'
        })
      }
    )
  } else {
    res.status(403).send({
      error: 'Please provide a query in the request body'
    })
  }
})

app.get('/users', (req, res) => {
  users.getUsers(req.token)
    .then(
      (users) => res.send(users),
      (error) => {
        console.error(error)

        res.status(500).send({
          error: 'There was an error retrieving the questions'
        })
      }
    )
})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
