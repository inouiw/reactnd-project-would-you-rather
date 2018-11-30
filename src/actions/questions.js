import * as data from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

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

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function addQuestionAnswer(authedUserId, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUserId,
    qid,
    answer
  }
}
