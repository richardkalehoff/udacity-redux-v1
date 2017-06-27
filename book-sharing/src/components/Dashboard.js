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

class Dashboard extends Component {
  state = {
    showBooksOwned: true,
  }
  showBooksOwned = () => {
    this.setState({
      showBooksOwned: true,
    })
  }
  showBooksBorrowed = () => {
    this.setState({
      showBooksOwned: false,
    })
  }
  render() {
    const { authedId, books, borrowers, owners, users, dispatch } = this.props
    const { showBooksOwned } = this.state
    const booksBorrowed = parseBorrowedBooks({ borrowers, users, authedId, books })
    const booksOwned = parseOwnedBooks({ owners, users, authedId, books })

    return (
      <div>
        <div className='dashboard-toggle'>
          <button
            style={{textDecoration: showBooksOwned === true ? 'underline' : null}}
            onClick={this.showBooksOwned}>
              Books Owned
          </button>
          <span> | </span>
          <button
            style={{textDecoration: showBooksOwned === false ? 'underline' : null}}
            onClick={this.showBooksBorrowed}>
              Books Borrowed
          </button>
        </div>
        <ul className='dashboard-list'>
          {showBooksOwned === true
            ? booksOwned.map(({ book, borrower }) => (
                <li key={book.id}>
                  <Book book={book}>
                    {borrower && (
                      <p className='emphasize'>*This book is currently being borrowed by {borrower.name}</p>
                    )}
                  </Book>
                </li>
              ))
            : booksBorrowed.map(({ book, owner }) => (
                <li key={book.id}>
                  <Book book={book}>
                    <p className='emphasize'>You borrowed this book from {owner.name}</p>
                    <button
                      className='btn'
                      onClick={() => dispatch(returnBook({ authedId, bookId: book.id, ownerId: owner.id}))}>
                        Return Book
                    </button>
                  </Book>
                </li>
              ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps)(Dashboard)