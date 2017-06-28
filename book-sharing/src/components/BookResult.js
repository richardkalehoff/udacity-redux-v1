import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBook } from '../utils/api'
import Book from './Book'
import { borrowBook, returnBook } from '../actions'
import ReactLoading from 'react-loading'

class BookResult extends Component {
  state = {
    loading: true,
    book: null,
  }
  componentDidMount () {
    const { book, match } = this.props

    if (!book) {
      getBook(match.params.id)
        .then((book) => this.setState({ loading: false, book }))
    } else {
      this.setState({ loading: false, book })
    }
  }
  render() {
    const { loading, book } = this.state
    const { availableFrom, dispatch, authedId, alreadyOwned, borrowedFrom } = this.props

    if (loading === true) {
      return <ReactLoading className='loading' type='spin' color='black' />
    }

    if (alreadyOwned) {
      return (
        <Book book={book}>
          <p className='emphasize'>
            You already own this book
          </p>
        </Book>
      )
    }

    if (borrowedFrom) {
      return (
        <Book book={book}>
          <p className='emphasize'>You borrowed this book from {borrowedFrom.name}</p>
          <button
            className='btn'
            onClick={() => dispatch(returnBook({authedId, bookId: book.id, ownerId: borrowedFrom.id}))}>
              Return Book
          </button>
        </Book>
      )
    }

    return (
      <Book book={book}>
        {availableFrom.length === 0
          ? <p className='emphasize'> This book is not available </p>
          : <div>
              <h3 className='emphasize'>This book is available from</h3>
              <ul>
                {availableFrom.map(({ id, name, avatarURL }) => (
                  <li className='available-item' key={id}>
                    <img
                      src={avatarURL}
                      alt={`avatar of ${name}`}
                    />
                    <span>{name}</span>
                    <button
                      className='btn small'
                      onClick={() => dispatch(borrowBook({authedId, ownerId: id, bookId: book.id}))}>
                        Borrow
                    </button>
                  </li>
                ))}
              </ul>
            </div>}
      </Book>
    )
  }
}

function mapStateToProps ({ owners, users, books, authedId, borrowers }, { match }) {
  const bookId = match.params.id
  const { allIds, byId } = owners
  const alreadyOwned = byId[authedId] && typeof byId[authedId][bookId] !== 'undefined'
  const borrowedFrom = borrowers[authedId] && users[borrowers[authedId][bookId]]
  const availableFrom = allIds.filter((uid) => byId[uid][bookId] === null )
    .map((id) => users[id])

  return {
    book: books[bookId],
    availableFrom,
    authedId,
    alreadyOwned,
    borrowedFrom,
  }
}

export default connect(
  mapStateToProps
)(BookResult)