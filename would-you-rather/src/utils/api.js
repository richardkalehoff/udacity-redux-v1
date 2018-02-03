import { formatQuestions } from './helpers'

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function fail () {
  return false
  // return Math.floor(Math.random() * 4) === 3
}

const users = {
  sarah_edo: {
    id: 'sarah_edo',
    name: 'Sarah Edo',
    avatarURL: 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    avatarURL: 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  dan_abramov: {
    id: 'dan_abramov',
    name: 'Dan Abramov',
    avatarURL: 'https://tylermcginnis.com/would-you-rather/dan.jpg',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

const questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarah_edo',
    timestamp: 1467166872634,
    optionOne: {
      count: 1,
      text: 'have horrible short term memory',
    },
    optionTwo: {
      count: 0,
      text: 'have horrible long term memory'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'dan_abramov',
    timestamp: 1468479767190,
    optionOne: {
      count: 2,
      text: 'become a superhero',
    },
    optionTwo: {
      count: 0,
      text: 'become a supervillian'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'sarah_edo',
    timestamp: 1488579767190,
    optionOne: {
      count: 0,
      text: 'be telekinetic',
    },
    optionTwo: {
      count: 1,
      text: 'be telepathic'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'tylermcginnis',
    timestamp: 1482579767190,
    optionOne: {
      count: 0,
      text: 'be a front-end developer',
    },
    optionTwo: {
      count: 1,
      text: 'be a back-end developer'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'tylermcginnis',
    timestamp: 1489579767190,
    optionOne: {
      count: 1,
      text: 'find $50 yourself',
    },
    optionTwo: {
      count: 1,
      text: 'have your best friend find $500'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'dan_abramov',
    timestamp: 1493579767190,
    optionOne: {
      count: 1,
      text: 'write JavaScript',
    },
    optionTwo: {
      count: 1,
      text: 'write Swift'
    }
  },
}

export function getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => {
      fail()
        ? rej({ error: 'There was an error getting the questions.'})
        : res({...questions})
    }, 1000)
  })
  .then((qs) => formatQuestions(qs))
}

export function saveQuestion (question) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const id = generateUID()
      const timestamp = Date.now()

      if (fail()) {
        return rej({
          error: 'There was an error saving your question.'
        })
      }

      questions[id] = {
        id,
        timestamp: question.timestamp,
        optionOne: {
          count: 0,
          text: question.optionOneText,
        },
        optionTwo: {
          count: 0,
          text: question.optionTwoText,
        }
      }

      res({
        optionOneCount: 0,
        optionTwoCount: 0,
        optionOneVoters: [],
        optionTwoVoters: [],
        timestamp,
        id,
        author: question.author,
        optionOneText: question.optionOneText,
        optionTwoText: question.optionTwoText,
      })
    }, 400)
  })
}

export function selectOption (id, option) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (fail()) {
        return rej({ error: 'There was an error. Try again.' })
      }

      questions[id][option].count = questions[id][option].count + 1
      res(questions)
    }, 2000)
  })
}

export function getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => {
      fail() ? rej({ error: 'There was an error. Try again.'}) : res(users)
    }, 2000)
  })
}