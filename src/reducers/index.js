import { combineReducers } from 'redux'
import authedUserId from './authedUserId'
import questions from './questions'
import users from './users'

export default combineReducers({
  authedUserId,
  questions,
  users,
})