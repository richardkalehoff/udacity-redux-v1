import React from 'react'
import throttle from 'lodash.throttle'
import { Link } from 'react-router-dom'
import { search } from '../utils/booksAPI'
import Book from './Book'
import { receiveBooks, ownBook } from '../actions'
import { connect } from 'react-redux'

function toObject (books) {
  return books.reduce((results, book) => {
    results[book.id] = book
    return results
  }, {})
}

class SearchBooks extends React.Component {
  state = {
    books: [],
    query: ''
  }

  execSearch = (query) => {
    const result = this.currentSearch = search(query).then((books) => {
      if (this.currentSearch === result)
        this.props.dispatch(receiveBooks(toObject(books)))
        this.setState({ books })
    })
  }

  updateQuery(query) {
    this.currentSearch = null

    if (query)
      this.execSearch(query)

    this.setState({
      books: [],
      query
    })
  }

  componentDidMount() {
    this.input.focus()

    this.execSearch = throttle(this.execSearch, 1000, {
      leading: false,
      trailing: true
    })

    const { query } = this.state

    if (query)
      this.execSearch(query)
  }
  handleBorrowIt = (book) => {
    this.props.history.push(`/books/${book.id}`)
  }
  render() {
    const { books, query } = this.state
    const { authedId, dispatch, authedUsersBooks } = this.props

    return (
      <div>
        <div>
          <Link to="/">Close</Link>

          <div>
            <input
              type="text"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
              ref={node => this.input = node}
              placeholder="Search by title, author, or ISBN"
            />
          </div>
        </div>

        <div>
          {books.map((book) => (
            <Book key={book.id} book={book}>
              {authedUsersBooks && typeof authedUsersBooks[book.id] !== 'undefined'
                ? <div>You own this</div>
                : <div>
                    <button onClick={() => this.handleBorrowIt(book)}>Borrow it</button>
                    <button onClick={() => dispatch(ownBook({ authedId, bookId: book.id}))}>I own it</button>
                  </div>}
            </Book>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedId, owners }) {
  return {
    authedId,
    authedUsersBooks: owners.byId[authedId],
  }
}

export default connect(mapStateToProps)(SearchBooks)
