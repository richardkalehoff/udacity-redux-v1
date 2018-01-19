import { ADD_QUESTION, RECEIVE_QUESTIONS } from '../actions/questions'
import { ADD_ANSWER } from '../actions/shared'

export default function questions (state = {}, action) {
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
      const { answer, qid, authedUser } = action
      const question = state[qid]
      const votersKey = answer + 'Voters'
      const countKey = answer + 'Count'

      return {
        ...state,
        [action.qid]: {
          ...question,
          [votersKey]: question[votersKey].concat([authedUser]),
          [countKey]: question[countKey] + 1
        }
      }
    default :
      return state
  }
}