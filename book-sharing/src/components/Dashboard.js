import React, { Component }  from 'react'
import { connect } from 'react-redux'
import Book from './Book'
import { returnBook } from '../actions'

function parseOwnedBooks ({ owners, users, authedId, books }) {
  return Object.keys(owners.byId[authedId]).map((bookId) => ({
    book: books[bookId],
    borrower: users[owners.byId[authedId][bookId]]
  }))
}

function parseBorrowedBooks ({ borrowers, books, users, authedId }) {
  return Object.keys(borrowers[authedId]).map((bookId) => ({
    book: books[bookId],
    owner: users[borrowers[authedId][bookId]]
  }))
}

function UserPreview ({ type, user }) {
  return (
    <span>
      {type}:
        <img
          style={{height: 30, width: 30}}
          src={user.avatarURL}
          alt={`Avatar for ${user.name}`}
        />
        {user.name}
    </span>
  )
}

class Dashboard extends Component {
  render() {
    const { authedId, books, borrowers, owners, users, dispatch } = this.props
    const booksBorrowed = parseBorrowedBooks({ borrowers, users, authedId, books })
    const booksOwned = parseOwnedBooks({ owners, users, authedId, books })

    return (
      <div>
        <div>
          <h1>Books you Own</h1>
          {booksOwned.length === 0
            ? <div>You dont own any books</div>
            : <ul>
                {booksOwned.map(({ book, borrower }) => (
                    <li key={book.id}>
                      <Book book={book}>
                        {borrower && <UserPreview type='Borrower' user={borrower} />}
                      </Book>
                    </li>
                ))}
              </ul>}
        </div>
        <div>
          <h1>Books you've Borrowed</h1>
          {booksBorrowed.length === 0
            ? <div>You havent borrowed any books</div>
            : <ul>
                {booksBorrowed.map(({ book, owner }) => (
                    <li key={book.id}>
                      <Book book={book}>
                        <UserPreview type='Owner' user={owner} />
                        <button onClick={() => dispatch(returnBook({ authedId, bookId: book.id, ownerId: owner.id}))}>Return Book</button>
                      </Book>
                    </li>
                ))}
              </ul>}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps)(Dashboard)