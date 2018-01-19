import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addAnswer } from '../actions/shared'
import Checked from 'react-icons/lib/io/ios-checkmark-outline'
import { selectOption } from '../utils/api'

function Card ({ onClick, text, selected, count, percentage }) {
  return typeof onClick === 'undefined'
    ? <div className='card'>
        <div>
          {selected && <Checked className='icon' />}
          <div className='percentage'>{percentage}%</div>
          <div className='agree'>
            Count: {count}
          </div>
          <div className='decision-text-answered'>
            {text}
          </div>
        </div>
      </div>
    : <div className='card' onClick={onClick}>
        {text}
      </div>
}

class Question extends Component {
  handleClick(option) {
    const { dispatch, question, authedUser } = this.props

    dispatch(addAnswer(
      authedUser,
      question.id,
      option,
    ))

    selectOption(question.id, option)
  }
  render() {
    const { question, answer, authorAvatar } = this.props

    if (!question) {
      return <p style={{textAlign: 'center'}}>This question doesn't exist</p>
    }

    const { optionOneText, optionTwoText } = question

    if (answer) {
      const { optionOneCount, optionTwoCount } = question
      const total = optionOneCount + optionTwoCount

      return (
        <div className='question-container'>
          <img className='avatar or' src={authorAvatar} alt="Author's avatar" />
          <Card
            text={optionOneText}
            count={optionOneCount}
            percentage={total === 0 ? 0 : parseInt(optionOneCount / total * 100, 10)}
            selected={answer === 'optionOne'}
          />
          <Card
            text={optionTwoText}
            count={optionTwoCount}
            percentage={total === 0 ? 0 : parseInt(optionTwoCount / total * 100, 10)}
            selected={answer === 'optionTwo'}
          />
        </div>
      )
    }

    return (
      <div className='question-container'>
        <img className='avatar or' src={authorAvatar} alt="Author's avatar" />
        <Card
          onClick={() => this.handleClick('optionOne')}
          text={optionOneText}
        />
        <Card
          onClick={() => this.handleClick('optionTwo')}
          text={optionTwoText}
        />
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, { match }) {
  const { id } = match.params
  const question = questions[id]

  if (!question) {
    return {
      question: null
    }
  }

  let answer
  if (question.optionOneVoters.includes(authedUser)) {
    answer = 'optionOne'
  } else if (question.optionTwoVoters.includes(authedUser)) {
    answer = 'optionTwo'
  } else {
    answer = null
  }

  return {
    question,
    answer,
    authedUser,
    authorAvatar: users[question.author].avatarURL,
  }
}

export default connect(mapStateToProps)(Question)