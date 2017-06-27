import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    showAnswered: false,
  }
  showAnswered = () => {
    this.setState({
      showAnswered: true,
    })
  }
  showUnanswered = () => {
    this.setState({
      showAnswered: false,
    })
  }
  render () {
    const { showAnswered } = this.state
    const { answered, unanswered } = this.props

    const list = showAnswered === true
      ? answered
      : unanswered

    return (
      <div>
        <div className='dashboard-toggle'>
          <button
            style={{textDecoration: showAnswered === false ? 'underline' : null}}
            onClick={this.showUnanswered}>
              Unanswered
          </button>
          <span> | </span>
          <button
            style={{textDecoration: showAnswered === true ? 'underline' : null}}
            onClick={this.showAnswered}>
              Answered
          </button>
        </div>
        <ul className='dashboard-list'>
          {list.map((question) => (
            <li key={question.id}>
              <Link to={`questions/${question.id}`}>
                <span>{question.optionOneText}</span>
                <span> or </span>
                <span>{question.optionTwoText}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedId, usersAnswers, questions }) {
  const answeredIds = Object.keys(usersAnswers[authedId])
  const unansweredIds = Object.keys(questions)
    .filter((id) => typeof usersAnswers[authedId][id] === 'undefined')

  const answered = answeredIds.map((id) => questions[id])
  const unanswered = unansweredIds.map((id) => questions[id])

  return {
    answered,
    unanswered,
  }
}

export default connect(mapStateToProps)(Dashboard)