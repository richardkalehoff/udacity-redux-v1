import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  setAuthedUser,
  receiveUsers,
  receiveBooks,
  setOwners,
  setBorrowers,
} from './actions'
import { getUsers } from './utils/usersAPI'
import { getAll } from './utils/booksAPI'

class App extends Component {
  state = {
    loading: true,
  }
  componentDidMount () {
    const { dispatch } = this.props

    dispatch(setAuthedUser('tylermcginnis33'))

    getUsers().then((users) => {
      dispatch(receiveUsers(users))

      const userIds = Object.keys(users)

      const owners = userIds.reduce((owners, id) => {
        owners.allIds.push(id)
        owners.byId[id] = {
          ...users[id].books.own
        }
        return owners
      }, {byId: {}, allIds: []})

      dispatch(setOwners(owners))

      const borrowers = userIds.reduce((borrowers, id) => {
        borrowers[id] = {
          ...users[id].books.borrowed
        }
        return borrowers
      }, {})

      dispatch(setBorrowers(borrowers))

      const bookIds = userIds.reduce((books, user) =>
        books.concat(
          Object.keys(users[user].books.own),
          Object.keys(users[user].books.borrowed)
        ), [])

      getAll(bookIds)
        .then((books) => books.reduce((formatted, book) => {
          formatted[book.id] = book
          return formatted
        }, {}))
        .then((formattedBooks) => dispatch(receiveBooks(formattedBooks)))
        .then(() => this.setState({loading: false}))
    })
  }
  render() {
    const { loading } = this.state

    return (
      <div>
        {loading && <p> LOADING </p>}
        EYEOOEOEO
      </div>
    )
  }
}

export default connect()(App)