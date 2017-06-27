import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from '../utils/booksAPI'
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
      return <ReactLoading className='loading' type='spin' color='black' />
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
        <Book book={book}>
          {availableFrom.length === 0
            ? <p className='emphasize'> This book is not available </p>
            : <div>
                <h3 className='emphasize'>This book is available from</h3>
                <ul>
                  {availableFrom.map(({ id, name, avatarURL }) => (
                    <li key={id}>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <img
                          style={{width: 30, height: 30}}
                          src={avatarURL}
                          alt={`avatar of ${name}`}
                        />
                        <span style={{margin: '0 10px'}}>{name}</span>
                        <button className='btn small' onClick={() => dispatch(borrowBook({authedId, ownerId: id, bookId: book.id}))}>Borrow</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>}
        </Book>
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