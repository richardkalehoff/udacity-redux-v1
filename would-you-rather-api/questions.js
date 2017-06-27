const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    optionOne: {
      count: 19,
      text: 'be attractive and poor',
    },
    optionTwo: {
      count: 27,
      text: 'be ugly and rich'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    optionOne: {
      count: 14,
      text: 'become a superhero',
    },
    optionTwo: {
      count: 15,
      text: 'become a supervillian'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    timestamp: 1488579767190,
    optionOne: {
      count: 19,
      text: 'be telekinetic',
    },
    optionTwo: {
      count: 22,
      text: 'be telepathic'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    timestamp: 1482579767190,
    optionOne: {
      count: 29,
      text: 'live in a giant shoe',
    },
    optionTwo: {
      count: 31,
      text: 'live in a giant peach'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    timestamp: 1489579767190,
    optionOne: {
      count: 25,
      text: 'find $50 yourself',
    },
    optionTwo: {
      count: 4,
      text: 'have your best friend find $500'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    timestamp: 1493579767190,
    optionOne: {
      count: 19,
      text: 'be allergic to babies',
    },
    optionTwo: {
      count: 22,
      text: 'be allergic to elderly people'
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

    questions[question.id] = {
      id: question.id,
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

    res(questions)
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
