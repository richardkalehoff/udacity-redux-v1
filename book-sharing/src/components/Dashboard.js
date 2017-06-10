import React, { Component }  from 'react'
import { connect } from 'react-redux'
import Book from './Book'

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
    const { authedId, books, borrowers, owners, users } = this.props

    return (
      <div>
        <div>
          <h1>Books you Own</h1>
          <ul>
            {parseOwnedBooks({ owners, users, authedId, books })
              .map(({ book, borrower }) => (
                <li key={book.id}>
                  <Book book={book}>
                    {borrower && <UserPreview type='Borrower' user={borrower} />}
                  </Book>
                </li>
            ))}
          </ul>
        </div>
        <div>
          <h1>Books you've Borrowed</h1>
          <ul>
            {parseBorrowedBooks({ borrowers, users, authedId, books })
              .map(({ book, owner }) => (
                <li key={book.id}>
                  <Book book={book}>
                    <UserPreview type='Owner' user={owner} />
                  </Book>
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

export default connect(mapStateToProps)(Dashboard)