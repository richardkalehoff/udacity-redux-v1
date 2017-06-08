import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import SearchBooks from './SearchBooks'
import BookResult from './BookResult'
import Nav from './Nav'

export default function App () {
  return (
    <Router>
      <div>
        <Nav />
        <Route path='/' exact component={Dashboard} />
        <Route path='/books' exact component={SearchBooks} />
        <Route path='/books/:id' component={BookResult} />
      </div>
    </Router>
  )
}