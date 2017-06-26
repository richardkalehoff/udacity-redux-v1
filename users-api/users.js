const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  users: {
    ryanflorence: {
      id: 'ryanflorence',
      name: 'Ryan Florence',
      avatarURL: config.origin + '/ryan.jpg',
      books: {
        own: {
          'PGR2AwAAQBAJ': 'tylermcginnis33',
          'yDtCuFHXbAYC': null,
        },
        borrowed: {
          'uu1mC6zWNTwC': 'tylermcginnis33'
        }
      }
    },
    tylermcginnis33: {
      id: 'tylermcginnis33',
      name: 'Tyler McGinnis',
      avatarURL: config.origin + '/tyler.jpg',
      books: {
        own: {
          'uu1mC6zWNTwC': 'ryanflorence',
          'wrOQLV6xB-wC': null,
          'pD6arNyKyi8C': 'mjackson',
        },
        borrowed: {
          '1q_xAwAAQBAJ': 'mjackson',
          'PGR2AwAAQBAJ': 'ryanflorence',
        }
      }
    },
    mjackson: {
      id: 'mjackson',
      name: 'Michael Jackson',
      avatarURL: config.origin + '/michael.jpg',
      books: {
        own: {
          '1q_xAwAAQBAJ': 'tylermcginnis33',
          '32haAAAAMAAJ': null,
        },
        borrowed: {
          'pD6arNyKyi8C': 'tylermcginnis33',
        }
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
    res(getData(token))
  })
}

module.exports = {
  get
}
