import * as data from '../utils/_DATA'
import * as users from './users'
import * as questions from './questions'

export function saveQuestion(optionOneText, optionTwoText, authedUserId) {
  return (dispatch) => {
    data._saveQuestion({ optionOneText, optionTwoText, author: authedUserId })
    .then((formattedQuestion) => {
      dispatch(questions.addQuestion(formattedQuestion))
      dispatch(users.addQuestion(authedUserId, formattedQuestion.id))
    })
  }
}

export function saveQuestionAnswer(authedUserId, qid, answer) {
  return (dispatch) => {
    data._saveQuestionAnswer({ authedUser: authedUserId, qid, answer })
    .then(() => { 
      dispatch(questions.addQuestionAnswer(authedUserId, qid, answer))
      dispatch(users.addQuestionAnswer(authedUserId, qid, answer))
    })
  }
}
