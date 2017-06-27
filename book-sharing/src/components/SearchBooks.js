import React from 'react'
import throttle from 'lodash.throttle'
import { search } from '../utils/api'
import Book from './Book'
import { receiveBooks, ownBook } from '../actions'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'

function toObject (books) {
  return books.reduce((results, book) => {
    results[book.id] = book
    return results
  }, {})
}

class SearchBooks extends React.Component {
  state = {
    books: [],
    query: '',
    loading: false,
  }

  execSearch = (query) => {
    search(query).then((books) => {
      this.props.dispatch(receiveBooks(toObject(books)))
      this.setState({ books, loading: false })
    })
  }

  updateQuery(query) {
    if (query)
      this.execSearch(query)

    this.setState({
      books: [],
      query,
      loading: true
    })
  }

  componentDidMount() {
    this.input.focus()

    this.execSearch = throttle(this.execSearch, 1000, {
      leading: false,
      trailing: true
    })
  }
  handleBorrowIt = (book) => {
    this.props.history.push(`/books/${book.id}`)
  }
  render() {
    const { books, query, loading } = this.state
    const { authedId, dispatch, authedUsersBooks } = this.props

    return (
      <div>
        <input
          type="text"
          value={query}
          className='search-input'
          onChange={event => this.updateQuery(event.target.value)}
          ref={node => this.input = node}
          placeholder="Search by title, author, or ISBN"
        />

        {loading === true
          ? <ReactLoading className='loading' type='spin' color='black' />
          : <div>
              {books.map((book) => (
                <Book key={book.id} book={book}>
                  {authedUsersBooks && typeof authedUsersBooks[book.id] !== 'undefined'
                    ? <p className='emphasize'>You own this</p>
                    : <div>
                        <button className='btn' onClick={() => this.handleBorrowIt(book)}>Borrow it</button>
                        <button className='btn' onClick={() => dispatch(ownBook({ authedId, bookId: book.id}))}>I own it</button>
                      </div>}
                </Book>
              ))}
            </div>}
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
