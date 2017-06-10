import React from 'react'
import BookCover from './BookCover'

function formatDate (date) {
  return date
    ? `${date.slice(5).replace('-','/')}/${date.slice(0, 4)}`
    : 'N/A'
}

export default function Book ({ book, children }) {
  return (
    <div>
      <BookCover title={book.title} thumbnail={book.thumbnail} />
      <ul>
        {children && <li>{children}</li>}
        <li>Rating: {book.averageRating}</li>
        <li>Published: {formatDate(book.publishedDate)}</li>
        <li dangerouslySetInnerHTML={{__html: book.description}} />
      </ul>
    </div>
  )
}