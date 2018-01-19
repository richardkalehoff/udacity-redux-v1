import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveQuestion } from '../utils/api'
import { addQuestion } from '../actions/questions'

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
  }
  submitQuestion = () => {
    const { optionOneText, optionTwoText } = this.state
    const { dispatch, history, authedUser } = this.props

    // todo
    const question = {
      optionOneText,
      optionTwoText,
      optionOneCount: 0,
      optionTwoCount: 0,
      timestamp: Date.now(),
      optionOneVoters: [],
      optionTwoVoters: [],
      author: authedUser
    }

    saveQuestion(question)
      .then(({ id }) => dispatch(addQuestion({
        ...question,
        id
      })))

    history.push('/')
  }
  handleInputChange = (event) => {
    const { name, value } = event.target

    this.setState({
      [name]: value,
    })
  }
  render () {
    const { optionOneText, optionTwoText } = this.state

    return (
      <div className='add-question-container'>
        <h1 className='header center'>Would you rather</h1>
        <input
          className='option-input'
          type='text'
          name='optionOneText'
          value={optionOneText}
          onChange={this.handleInputChange}
        />
        <h3 className='header'>OR</h3>
        <input
          className='option-input'
          type='text'
          name='optionTwoText'
          value={optionTwoText}
          onChange={this.handleInputChange}
        />
        <button
          className='btn'
          onClick={this.submitQuestion}>
            Submit
        </button>
      </div>
    )
  }
}

export default connect((state) => ({
  authedUser: state.authedUser
}))(AddQuestion)