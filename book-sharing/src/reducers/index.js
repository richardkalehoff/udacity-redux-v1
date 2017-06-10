import { combineReducers } from 'redux'
import {
  SET_AUTHED_USER,
  RECEIVE_USERS,
  RECEIVE_BOOKS,
  SET_OWNERS,
  SET_BORROWERS,
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
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users,
      }
    default :
      return state
  }
}

function books (state = {}, action) {
  switch (action.type) {
    case RECEIVE_BOOKS :
      return {
        ...state,
        ...action.books,
      }
    default :
      return state
  }
}

function owners (state = {
  byId: {},
  allIds: [],
}, action) {
  switch (action.type) {
    case SET_OWNERS :
      return {
        ...state,
        ...action.owners,
      }
    default :
      return state
  }
}

function borrowers (state = {}, action) {
  switch (action.type) {
    case SET_BORROWERS :
      return {
        ...state,
        ...action.borrowers,
      }
    default :
      return state
  }
}

export default combineReducers({
  authedId,
  users,
  books,
  owners,
  borrowers,
})