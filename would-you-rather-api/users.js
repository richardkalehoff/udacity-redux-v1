const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  users: {
    sarah_edo: {
      id: 'sarah_edo',
      name: 'Sarah Edo',
      avatarURL: config.origin + '/sarah.jpg',
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
      avatarURL: config.origin + '/tyler.jpg',
      answers: {
        "vthrdm985a262al8qx3do": 'optionOne',
        "xj352vofupe1dqz9emx13r": 'optionTwo',
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    dan_abramov: {
      id: 'dan_abramov',
      name: 'Dan Abramov',
      avatarURL: config.origin + '/dan.jpg',
      answers: {
        "xj352vofupe1dqz9emx13r": 'optionOne',
        "vthrdm985a262al8qx3do": 'optionTwo',
        "6ni6ok3ym7mf1p33lnez": 'optionOne'
      },
      questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    }
  }
}

function getData (token) {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const get = (token, id) => {
  return new Promise((res) => {
    const data = getData(token)

    res(data.users[id])
  })
}

const getAll = (token) => {
  return new Promise((res) => {
    const data = getData(token)

    res(data.users)
  })
}

module.exports = {
  get,
  getAll
}
