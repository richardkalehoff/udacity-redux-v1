export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const RECEIVE_USERS_ANSWERS = 'RECEIVE_USERS_ANSWERS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function receiveUser (user) {
  return {
    type: RECEIVE_USER,
    user,
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function receiveUsersAnswers (id, answers) {
  return {
    type: RECEIVE_USERS_ANSWERS,
    id,
    answers,
  }
}

export function addAnswer (authedId, qid, answer) {
  return {
    type: ADD_ANSWER,
    authedId,
    qid,
    answer,
  }
}

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}