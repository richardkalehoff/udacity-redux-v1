export const ADD_ANSWER = 'ADD_ANSWER'

export function addAnswer (authedUser, qid, answer) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  }
}

