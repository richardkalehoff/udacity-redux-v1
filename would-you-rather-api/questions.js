const clone = require('clone')

function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

let db = {}

const defaultData = {
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

function getData (token) {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const questions = getData(token)

    res(questions[id])
  })
}

function add (token, question) {
  return new Promise((res) => {
    let questions = getData(token)
    const id = generateUID()
    const timestamp = Date.now()

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
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let questions = getData(token)
    questions[id][option].count = questions[id][option].count + 1

    res(questions)
  })
}

module.exports = {
  get,
  getAll,
  add,
  vote
}
