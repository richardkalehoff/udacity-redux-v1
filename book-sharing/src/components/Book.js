import React from 'react'
import BookCover from './BookCover'
import Rater from 'react-rater'

export default function Book ({ book, children }) {
  const { title, thumbnail, averageRating, description, authors } = book

  return (
    <div className='book-container'>
      <BookCover title={title} thumbnail={thumbnail} />
      <ul>
        {title && <li className='book-title'>{title}</li>}
        {authors && <li className='book-authors'>{book.authors.join(', ')}</li>}
        {averageRating && <li className='book-rating'><Rater interactive={false} rating={averageRating} /></li>}
        {description && <li dangerouslySetInnerHTML={{__html: description}} />}
        {children && <li>{children}</li>}
      </ul>
    </div>
  )
}