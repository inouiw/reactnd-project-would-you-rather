import * as data from '../utils/_DATA'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION_AT_USER = 'ADD_QUESTION_AT_USER'
export const ANSWER_QUESTION_AT_USER = 'ANSWER_QUESTION_AT_USER'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addQuestion(authedUserId, questionId) {
  return {
    type: ADD_QUESTION_AT_USER,
    authedUserId,
    questionId
  }
}

export function addQuestionAnswer(authedUserId, qid, answer) {
  return {
    type: ANSWER_QUESTION_AT_USER,
    authedUserId,
    qid,
    answer
  }
}

export function loadUsers() {
  return (dispatch) => {
    data._getUsers().then(users => {
      dispatch(receiveUsers(users))
    })
  }
}