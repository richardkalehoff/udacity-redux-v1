import { getQuestions, getUsers } from '../utils/api'
import { setAuthedUser } from '../actions/authedUser'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { selectOption } from '../utils/api'

const AUTHED_ID = 'tylermcginnis'

function formatUser ({ id, avatarURL, name, questions, answers }) {
  return {
    id,
    avatarURL,
    name,
    questions,
    answers: Object.keys(answers)
  }
}

function formatQuestions (questions, users) {
  const uids = Object.keys(users)

  const answersByUid = uids.reduce((answers, uid) => {
    answers[uid] = users[uid].answers
    return answers
  }, {})

  const qids = Object.keys(answersByUid).reduce((qids, uid) => {
    const usersVoteIds = Object.keys(answersByUid[uid])

    usersVoteIds.forEach((questionId) => {
      const option = answersByUid[uid][questionId]
      const key = option + 'Voters'

      if (!qids[questionId]) {
        qids[questionId] = {
          optionOneVoters: [],
          optionTwoVoters: [],
        }
      }

      qids[questionId][key].push(uid)
    })

    return qids
  }, {})

  const formattedQuestions = Object.keys(qids).reduce((formattedQuestions, qid) => {
    formattedQuestions[qid] = {
      ...questions[qid],
      ...qids[qid]
    }

    return formattedQuestions
  }, {})

  return formattedQuestions
}

export const ADD_ANSWER = 'ADD_ANSWER'

export function addAnswer (authedUser, qid, answer) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  }
}

export function handleAddAnswer ({ authedUser, id, option }) {
  return (dispatch) => {
    // todo.
    dispatch(addAnswer(
      authedUser,
      id,
      option,
    ))

    selectOption(id, option)
  }
}

export function handleInitialData () {
  return (dispatch) => {
    Promise.all([
      getUsers(),
      getQuestions()
    ]).then(([users, questions]) => {
      const { formattedUsers, formattedQuestions } = Object.keys(users)
        .reduce((result, id) => {
          result.formattedUsers[id] = formatUser(users[id])
          result.formattedQuestions = formatQuestions(questions, users)
          return result
        }, {formattedUsers: {}, formattedQuestions: {}})

      dispatch(receiveUsers(formattedUsers))
      dispatch(receiveQuestions(formattedQuestions))
      dispatch(setAuthedUser(AUTHED_ID))
    })
  }
}