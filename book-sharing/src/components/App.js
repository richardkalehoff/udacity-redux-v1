import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './Dashboard'

export default function App () {
  return (
    <Router>
      <div>
        <nav>NAV</nav>
        <Route path='/' component={Dashboard} />
      </div>
    </Router>
  )
}