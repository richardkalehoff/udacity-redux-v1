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
          'PGR2AwAAQBAJ': {
            id: 'PGR2AwAAQBAJ',
            borrower: 'tylermcginnis33'
          },
          'yDtCuFHXbAYC': {
            id: 'yDtCuFHXbAYC',
            borrower: null,
          }
        },
        borrowed: {
          'uu1mC6zWNTwC': {
            id: 'uu1mC6zWNTwC',
            owner: 'tylermcginnis33'
          }
        }
      }
    },
    tylermcginnis33: {
      id: 'tylermcginnis33',
      name: 'Tyler McGinnis',
      avatarURL: config.origin + '/tyler.jpg',
      books: {
        own: {
          'uu1mC6zWNTwC': {
            id: 'uu1mC6zWNTwC',
            borrower: 'ryanflorence'
          },
          'wrOQLV6xB-wC': {
            id: 'wrOQLV6xB-wC',
            borrower: 'mjackson',
          },
          'pD6arNyKyi8C': {
            id: 'pD6arNyKyi8C',
            borrower: 'mjackson'
          }
        },
        borrowed: {
          '1q_xAwAAQBAJ': {
            id: '1q_xAwAAQBAJ',
            owner: 'mjackson'
          },
          'PGR2AwAAQBAJ': {
            id: 'PGR2AwAAQBAJ',
            owner: 'ryanflorence'
          }
        }
      }
    },
    mjackson: {
      id: 'mjackson',
      name: 'Michael Jackson',
      avatarURL: config.origin + '/michael.jpg',
      books: {
        own: {
          '1q_xAwAAQBAJ': {
            id: '1q_xAwAAQBAJ',
            borrower: 'tylermcginnis33'
          },
          '32haAAAAMAAJ': {
            id: '32haAAAAMAAJ',
            borrower: null,
          }
        },
        borrowed: {
          'pD6arNyKyi8C': {
            id: 'pD6arNyKyi8C',
            owner: 'tylermcginnis33'
          },
          'wrOQLV6xB-wC': {
            id: 'wrOQLV6xB-wC',
            owner: 'tylermcginnis33'
          }
        }
      }
    }
  }
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

module.exports = {
  get
}
