import { combineReducers } from 'redux'
import {
  SET_AUTHED_USER,
  RECEIVE_USERS,
  RECEIVE_BOOKS,
  SET_OWNERS,
  SET_BORROWERS,
  BORROW_BOOK,
  RETURN_BOOK,
  OWN_BOOK,
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

function owners (state = { byId: {}, allIds: [] }, action) {
  const { bookId, ownerId, authedId, owners } = action

  switch (action.type) {
    case SET_OWNERS :
      return {
        ...state,
        ...owners,
      }
    case RETURN_BOOK :
      return {
        ...state,
        byId: {
          ...state.byId,
          [ownerId]: {
            ...state.byId[ownerId],
            [bookId]: null
          }
        }
      }
    case BORROW_BOOK :
      return {
        ...state,
        byId: {
          ...state.byId,
          [ownerId]: {
            ...state.byId[ownerId],
            [bookId]: authedId,
          }
        }
      }
    case OWN_BOOK :
      return {
        allIds: state.allIds.includes(authedId) ? state.allIds : state.allIds.concat(authedId),
        byId: {
          ...state.byId,
          [authedId]: {
            ...state.byId[authedId],
            [bookId]: null
          }
        }
      }
    default :
      return state
  }
}

function borrowers (state = {}, action) {
  const { authedId, ownerId, bookId, borrowers } = action

  switch (action.type) {
    case SET_BORROWERS :
      return {
        ...state,
        ...borrowers,
      }
    case RETURN_BOOK :
      return {
        ...state,
        [authedId]: Object.keys(state[authedId])
          .filter((bid) => bid !== bookId)
          .reduce((books, bid) => {
            books[bid] = state[authedId][bid]
            return books
          }, {})
      }
    case BORROW_BOOK :
      return {
        ...state,
        [authedId]: {
          ...state[authedId],
          [bookId]: ownerId,
        }
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