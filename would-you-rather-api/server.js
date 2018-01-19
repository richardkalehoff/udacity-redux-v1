require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const questions = require('./questions')
const users = require('./users')

const app = express()

app.use(express.static('public'))
app.use(cors())

app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the Would you Rather API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /questions
    GET /questions/:id
    POST /questions
    POST /questions/:id

    GET /users/:id
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

app.get('/questions', (req, res) => {
  questions.getAll(req.token)
    .then(
      (data) => res.send(data),
      (error) => {
        console.error(error)

        res.status(500).send({
          error: 'There was an error retrieving the questions'
        })
      }
    )
})

app.get('/questions/:id', (req, res) => {
  const { id } = req.params

  questions.get(req.token, id)
    .then(
      (data) => res.send(data),
      (error) => {
        console.error(error)

        res.status(500).send({
          error: 'There was an error retrieving the question'
        })
      }
    )
})

app.post('/questions', bodyParser.json(), (req, res) => {
  const { author, optionOneText, optionTwoText } = req.body
  if (!author || !optionOneText || !optionTwoText) {
    res.status(403).send({
      error: 'Please provide a properly formatted question.'
    })
  } else {
    questions.add(req.token, req.body)
      .then(
        (data) => res.send(data),
        (error) => {
          console.error(error)
          res.status(500).send({
            error: 'There was an error adding your question'
          })
        }
      )
  }
})

app.post('/questions/:id', bodyParser.json(), (req, res) => {
  const { id } = req.params
  const { option } = req.body

  if (option === 'optionOne' || option === 'optionTwo') {
    questions.vote(req.token, id, option)
      .then(
        (data) => res.send(data),
        (error) => {
          console.error(error)
          res.status(500).send({
            error: 'There was an error adding your question'
          })
        }
      )
  } else {
    res.status(403).send({
      error: 'Please provide an option of optionOne or optionTwo in the request body'
    })
  }
})

app.get('/users', (req, res) => {
  users.getAll(req.token)
    .then(
      (data) => res.send(data),
      (error) => {
        console.error(error)

        res.status(500).send({
          error: 'There was an error retreiving the users'
        })
      }
    )
})

app.get('/users/:id', (req, res) => {
  users.get(req.token, req.params.id)
    .then(
      (data) => res.send(data),
      (error) => {
        console.error(error)

        res.status(500).send({
          error: 'There was an error retrieving the user'
        })
      }
    )
})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})