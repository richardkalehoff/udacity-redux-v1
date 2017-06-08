import React from 'react'
import throttle from 'lodash.throttle'
import { Link } from 'react-router-dom'
import { search } from '../utils/booksAPI'
import Book from './Book'

class SearchBooks extends React.Component {
  state = {
    books: [],
    query: ''
  }

  execSearch = (query) => {
    const result = this.currentSearch = search(query).then((books) => {
      if (this.currentSearch === result)
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
    this.props.history.push(`/books/${book.id}`, { book })
  }
  render() {
    const { books, query } = this.state
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
              <button onClick={() => this.handleBorrowIt(book)}>Borrow it</button>
              <button>I own it</button>
            </Book>
          ))}
        </div>
      </div>
    )
  }
}

export default SearchBooks
