import { formatQuestions, formatQuestion } from './helpers'

const api = process.env.REDUX_ASSESSMENT_QUESTIONS_API || 'http://localhost:5002'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export function get (id) {
  return fetch(`${api}/questions/${id}`, { headers })
    .then(res => res.json())
    .then((question) => formatQuestion(question))
}

export function getQuestions () {
  return fetch(`${api}/questions/`, { headers })
    .then(res => res.json())
    .then((questions) => formatQuestions(questions))
}

export function newQuestion (question) {
  return fetch(`${api}/questions`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(question)
  }).then(res => res.json())
}

export function selectOption (id, option) {
  return fetch(`${api}/questions/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option})
  }).then(res => res.json())
}