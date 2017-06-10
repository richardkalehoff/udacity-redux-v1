import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from '../utils/booksAPI'
import Book from './Book'

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

    return (
      <div>
        {loading === true
          ? <p>LOADING</p>
          : <div>
              <Book book={book} />
              <div>Available From: {JSON.stringify(this.props.availableFrom)}</div>
            </div>}
      </div>
    )
  }
}

function mapStateToProps ({ owners, users, books }, { match }) {
  const bookId = match.params.id
  const { allIds, byId } = owners
  const availableFrom = allIds.filter((uid) => byId[uid][bookId] && byId[uid][bookId].borrower === null)

  return {
    book: books[bookId],
    availableFrom
  }
}

export default connect(
  mapStateToProps
)(BookResult)