const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  users: {
    ryanflorence: {
      id: 'ryanflorence',
      name: 'Ryan Florence',
      avatarURL: config.origin + '/ryan.jpg',
      answers: {
        "8xf0y6ziyjabvozdd253nd": 'optionOne',
        "6ni6ok3ym7mf1p33lnez": 'optionOne',
        "am8ehyc8byjqgar0jgpub9": 'optionTwo',
        "loxhs1bqm25b708cmbf3g": 'optionTwo'
      }
    },
    tylermcginnis33: {
      id: 'tylermcginnis33',
      name: 'Tyler McGinnis',
      avatarURL: config.origin + '/tyler.jpg',
      answers: {
        "vthrdm985a262al8qx3do": 'optionOne',
        "xj352vofupe1dqz9emx13r": 'optionTwo',
      }
    },
    mjackson: {
      id: 'mjackson',
      name: 'Michael Jackson',
      avatarURL: config.origin + '/michael.jpg',
      answers: {
        "xj352vofupe1dqz9emx13r": 'optionOne',
        "vthrdm985a262al8qx3do": 'optionTwo',
        "6ni6ok3ym7mf1p33lnez": 'optionOne'
      }
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

module.exports = {
  get
}
