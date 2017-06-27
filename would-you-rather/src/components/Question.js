import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addAnswer } from '../actions'
import Checked from 'react-icons/lib/io/ios-checkmark-outline'
import { selectOption } from '../utils/api'

function Card ({ onClick, text, answered, selected, count, percentage }) {
  return answered
    ? <div className='card'>
        <div>
          {selected && <Checked className='icon' />}
          <div className='percentage'>{percentage}%</div>
          <div className='agree'>
            {count} {selected === true ? count === 1 ? 'agrees' : 'agree' : 'disagree'}
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
    const { dispatch, question, authedId } = this.props

    dispatch(addAnswer(
      authedId,
      question.id,
      option,
    ))

    selectOption(question.id, option)
  }
  render() {
    const { question, answer } = this.props

    if (typeof question === 'undefined') {
      return <p style={{textAlign: 'center'}}>This question doesn't exist</p>
    }

    const { optionOneText, optionTwoText } = question

    if (answer) {
      const { optionOneCount, optionTwoCount } = question
      const total = optionOneCount + optionTwoCount

      return (
        <div className='question-container'>
          <div className='or'><span>or</span></div>
          <Card
            text={optionOneText}
            count={optionOneCount}
            percentage={total === 0 ? 0 : parseInt(optionOneCount / total * 100, 10)}
            answered={!!answer}
            selected={answer === 'optionOne'}
          />
          <Card
            text={optionTwoText}
            count={optionTwoCount}
            percentage={total === 0 ? 0 : parseInt(optionTwoCount / total * 100, 10)}
            answered={!!answer}
            selected={answer === 'optionTwo'}
          />
        </div>
      )
    }

    return (
      <div className='question-container'>
        <div className='or'><span>or</span></div>
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

function mapStateToProps ({authedId, usersAnswers, questions}, { match }) {
  const { id } = match.params
  return {
    question: questions[id],
    answer: usersAnswers[authedId][id],
    authedId,
  }
}

export default connect(mapStateToProps)(Question)