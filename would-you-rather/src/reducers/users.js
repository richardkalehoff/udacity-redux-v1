import { RECEIVE_USERS } from '../actions/users'
import { ADD_ANSWER } from '../actions/shared'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users,
      }
    case ADD_ANSWER :
      const user = state[action.authedUser]

      return {
        ...state,
        [action.authedUser]: {
          ...user,
          answers: user.answers.concat([action.qid])
        }
      }
    default :
      return state
  }
}