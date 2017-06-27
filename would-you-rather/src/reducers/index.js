import { combineReducers } from 'redux'

import {
  SET_AUTHED_USER,
  RECEIVE_USER,
  RECEIVE_USERS_ANSWERS,
  RECEIVE_QUESTIONS,
  ADD_ANSWER,
  ADD_QUESTION,
} from '../actions'

function authedId (state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER :
      return action.id
    default :
      return state
  }
}

function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USER :
      return {
        ...state,
        [action.user.id]: action.user,
      }
    default :
      return state
  }
}

function questions (state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question,
      }
    case ADD_ANSWER :
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer + 'Count']: state[action.qid][action.answer + 'Count'] + 1
        }
      }
    default :
      return state
  }
}

function usersAnswers (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS_ANSWERS :
      return {
        ...state,
        [action.id]: action.answers
      }
    case ADD_ANSWER :
      return {
        ...state,
        [action.authedId]: {
          ...state[action.authedId],
          [action.qid]: action.answer,
        }
      }
    default :
      return state
  }
}

export default combineReducers({
  authedId,
  users,
  questions,
  usersAnswers,
})