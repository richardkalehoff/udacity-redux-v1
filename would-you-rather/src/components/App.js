import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { getQuestions, getUser } from '../utils/api'
import { connect } from 'react-redux'
import Nav from './Nav'
import Question from './Question'
import Dashboard from './Dashboard'
import AddQuestion from './AddQuestion'
import ReactLoading from 'react-loading'

import {
  setAuthedUser,
  receiveUser,
  receiveUsersAnswers,
  receiveQuestions,
} from '../actions'

const AUTHED_ID = 'tylermcginnis33'

class App extends Component {
  componentDidMount () {
    const { dispatch, loading  } = this.props
    if (loading === true) {
      Promise.all([
        getUser(AUTHED_ID),
        getQuestions()
      ]).then(([{ answers, ...user }, questions]) => {
        dispatch(receiveUser(user))
        dispatch(receiveUsersAnswers(AUTHED_ID, answers))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
      })
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
                <Route path='/questions/:id' component={Question} />
                <Route path='/add' component={AddQuestion} />
              </div>}
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ authedId, users }) {
  return {
    loading: authedId === null
  }
}

export default connect(mapStateToProps)(App)