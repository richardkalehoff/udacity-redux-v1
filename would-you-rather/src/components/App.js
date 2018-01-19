import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { getQuestions, getUsers } from '../utils/api'
import { connect } from 'react-redux'
import Nav from './Nav'
import Question from './Question'
import Dashboard from './Dashboard'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard'
import ReactLoading from 'react-loading'

import { setAuthedUser } from '../actions/authedUser'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'

const AUTHED_ID = 'tylermcginnis'

function formatUser ({ id, avatarURL, name, questions, answers }) {
  return {
    id,
    avatarURL,
    name,
    questions,
    answers: Object.keys(answers)
  }
}

function formatQuestions (questions, users) {
  const uids = Object.keys(users)

  const answersByUid = uids.reduce((answers, uid) => {
    answers[uid] = users[uid].answers
    return answers
  }, {})

  const qids = Object.keys(answersByUid).reduce((qids, uid) => {
    const usersVoteIds = Object.keys(answersByUid[uid])

    usersVoteIds.forEach((questionId) => {
      const option = answersByUid[uid][questionId]
      const key = option + 'Voters'

      if (!qids[questionId]) {
        qids[questionId] = {
          optionOneVoters: [],
          optionTwoVoters: [],
        }
      }

      qids[questionId][key].push(uid)
    })

    return qids
  }, {})

  const formattedQuestions = Object.keys(qids).reduce((formattedQuestions, qid) => {
    formattedQuestions[qid] = {
      ...questions[qid],
      ...qids[qid]
    }

    return formattedQuestions
  }, {})

  return formattedQuestions
}

class App extends Component {
  componentDidMount () {
    const { dispatch, loading  } = this.props
    if (loading === true) {
      Promise.all([
        getUsers(),
        getQuestions()
      ]).then(([users, questions]) => {
        const { formattedUsers, formattedQuestions } = Object.keys(users)
          .reduce((result, id) => {
            result.formattedUsers[id] = formatUser(users[id])
            result.formattedQuestions = formatQuestions(questions, users)
            return result
          }, {formattedUsers: {}, formattedQuestions: {}})

        dispatch(receiveUsers(formattedUsers))
        dispatch(receiveQuestions(formattedQuestions))
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