import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import Question from './Question'
import Dashboard from './Dashboard'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard'
import ReactLoading from 'react-loading'
import { handleInitialData } from '../actions/shared'

class App extends Component {
  componentDidMount () {
    const { dispatch, loading  } = this.props
    if (loading === true) {
      dispatch(handleInitialData())
    }
  }
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          {this.props.loading === true
            ? <ReactLoading className='loading' type='spin' color='black' />
            : <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/questions/:id' component={Question} />
                <Route path='/add' component={AddQuestion} />
              </div>}
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)