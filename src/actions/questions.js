import * as data from '../utils/_DATA'
import { loadUsers } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function loadQuestions() {
  return (dispatch) => {
    data._getQuestions().then(questions => {
      dispatch(receiveQuestions(questions))
    })
  }
}

export function saveQuestionAnswer(authedUserId, qid, answer) {
  return (dispatch) => {
    data._saveQuestionAnswer({ authedUser: authedUserId, qid, answer })
    .then(() => dispatch(loadQuestions()) && dispatch(loadUsers()))
  }
}

export function saveQuestion(optionOneText, optionTwoText, authedUserId) {
  return (dispatch) => {
    data._saveQuestion({ optionOneText, optionTwoText, author: authedUserId })
    .then(() => dispatch(loadQuestions()))
  }
}