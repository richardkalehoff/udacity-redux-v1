const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const users = require('./users')

const app = express()

app.use(express.static('public'))
app.use(cors())

app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the Users API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

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

app.get('/users', (req, res) => {
  users.get(req.token)
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
