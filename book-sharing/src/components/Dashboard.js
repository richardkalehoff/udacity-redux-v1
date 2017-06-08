import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  setAuthedUser,
  receiveUsers,
  receiveBooks,
  setOwners,
  setBorrowers,
} from '../actions'
import { getUsers } from '../utils/usersAPI'
import { getAll } from '../utils/booksAPI'
import BookCover from './BookCover'

function formatUsers (users) {
  return Object.keys(users)
    .reduce((formattedUsers, id) => {
      formattedUsers[id] = {
        id,
        name: users[id].name,
        avatarURL: users[id].avatarURL,
      }

      return formattedUsers
    }, {})
}

function parseOwners (userIds, users) {
  return userIds.reduce((owners, id) => {
    owners.allIds.push(id)
    owners.byId[id] = {
      ...users[id].books.own
    }
    return owners
  }, {byId: {}, allIds: []})
}

function parseBorrowers (userIds, users) {
  return userIds.reduce((borrowers, id) => {
    borrowers[id] = {
      ...users[id].books.borrowed
    }
    return borrowers
  }, {})
}

function parseBookIds (userIds, users) {
  return userIds.reduce((books, user) =>
    books.concat(
      Object.keys(users[user].books.own),
      Object.keys(users[user].books.borrowed)
    ), [])
}

function formatBooks (books) {
  return books.reduce((formatted, book) => {
    formatted[book.id] = book
    return formatted
  }, {})
}

function parseOwnedBooks ({ owners, users, authedId, books }) {
  return Object.keys(owners.byId[authedId]).map((id) => ({
    book: books[id],
    borrower: users[owners.byId[authedId][id].borrower]
  }))
}

function parseBorrowedBooks ({ borrowers, books, users, authedId }) {
  return Object.keys(borrowers[authedId]).map((id) => ({
    book: books[id],
    owner: users[borrowers[authedId][id].owner]
  }))
}

class Dashboard extends Component {
  state = {
    loading: true
  }
  componentDidMount () {
    const { dispatch } = this.props

    dispatch(setAuthedUser('tylermcginnis33'))

    getUsers().then((users) => {
      const userIds = Object.keys(users)

      dispatch(receiveUsers(formatUsers(users)))
      dispatch(setOwners(parseOwners(userIds, users)))
      dispatch(setBorrowers(parseBorrowers(userIds, users)))

      getAll(parseBookIds(userIds, users))
        .then(formatBooks)
        .then((formattedBooks) => dispatch(receiveBooks(formattedBooks)))
        .then(() => this.setState({loading: false}))
    })
  }
  render() {
    const { loading } = this.state
    const { authedId, books, borrowers, owners, users } = this.props

    return loading === true ? <p>LOADING</p> : (
      <div>
        <div>
          <h1>Owned</h1>
          <ul>
            {parseOwnedBooks({ owners, users, authedId, books })
              .map(({ book, borrower }) => (
                <li key={book.id}>
                  <BookCover title={book.title} thumbnail={book.thumbnail} />
                  { borrower && <span>borrower: {borrower.name}</span> }
                </li>
            ))}
          </ul>
        </div>
        <div>
          <h1>Borrowed</h1>
          <ul>
            {parseBorrowedBooks({ borrowers, users, authedId, books })
              .map(({ book, owner }) => (
                <li key={book.id}>
                  <BookCover title={book.title} thumbnail={book.thumbnail} />
                  owner: {owner.name}
                </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default withRouter(connect(mapStateToProps)(Dashboard))