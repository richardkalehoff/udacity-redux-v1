import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/add'>
            Add Book
          </NavLink>
        </li>
        <li>
          <NavLink to='/books'>
            Search Books
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}