import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from '../utils/booksAPI'
import Book from './Book'
import { borrowBook, returnBook } from '../actions'

class BookResult extends Component {
  state = {
    loading: true,
    book: null,
  }
  componentDidMount () {
    const { book, match } = this.props

    if (!book) {
      get(match.params.id)
        .then((book) => this.setState({ loading: false, book }))
    } else {
      this.setState({ loading: false, book })
    }
  }
  render() {
    const { loading, book } = this.state
    const { availableFrom, dispatch, authedId, alreadyOwned, borrowedFrom } = this.props

    if (loading === true) {
      return <div>Loading</div>
    }

    if (alreadyOwned) {
      return (
        <div>
          <Book book={book} />
          <div>You already own this book.</div>
        </div>
      )
    }

    if (borrowedFrom) {
      return (
        <div>
          <Book book={book} />
          <div>You borrowed this book from {borrowedFrom.name}</div>
          <button onClick={() => dispatch(returnBook({authedId, bookId: book.id, ownerId: borrowedFrom.id}))}>Return Book</button>
        </div>
      )
    }

    return (
      <div>
        <Book book={book} />
        {availableFrom.length === 0
          ? <p> This book is not available </p>
          : <div>
              <h1>Borrow from...</h1>
              {availableFrom.map(({ id, name, avatarURL }) => (
                <div key={id}>
                  <img src={avatarURL} alt={`Avatar for ${name}`} style={{height: 50, width: 50}}/>
                  <span>{name}</span>
                  <button onClick={() => dispatch(borrowBook({authedId, ownerId: id, bookId: book.id}))}>Borrow</button>
                </div>
              ))}
            </div>}
      </div>
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