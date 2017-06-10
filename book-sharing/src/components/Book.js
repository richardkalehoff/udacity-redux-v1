import React from 'react'
import BookCover from './BookCover'

function formatDate (date) {
  return date.slice(0,4)
}

export default function Book ({ book, children }) {
  const { title, thumbnail, averageRating, publishedDate, description } = book
  return (
    <div>
      <BookCover title={title} thumbnail={thumbnail} />
      <ul>
        {children && <li>{children}</li>}
        {averageRating && <li>Rating: {averageRating}</li>}
        {publishedDate && <li>Published: {formatDate(publishedDate)}</li>}
        {description && <li dangerouslySetInnerHTML={{__html: description}} />}
      </ul>
    </div>
  )
}