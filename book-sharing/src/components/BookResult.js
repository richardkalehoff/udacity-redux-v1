import React, { Component } from 'react'
import { connect } from 'react-redux'

class BookResult extends Component {
  componentDidMount () {

  }
  render() {
    console.log(this.props.location.state.book)
    return (
      <div>
        BOOK Result
      </div>
    )
  }
}

export default connect(
  ({ books }, { match }) => ({
    book: books[match.params.id]
  })
)(BookResult)