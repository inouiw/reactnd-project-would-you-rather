import { RECEIVE_USERS, ADD_QUESTION_AT_USER, ANSWER_QUESTION_AT_USER } from '../actions/users'

export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case ADD_QUESTION_AT_USER:
      return {
        ...state,
        [action.authedUserId]: {
          ...state[action.authedUserId],
          questions: state[action.authedUserId].questions.concat([action.questionId])
        }
      }
    case ANSWER_QUESTION_AT_USER:
    return {
      ...state,
      [action.authedUserId]: {
        ...state[action.authedUserId],
        answers: {
          ...state[action.authedUserId].answers,
          [action.qid]: action.answer
        }
        }
    }
    default:
      return state
  }
}