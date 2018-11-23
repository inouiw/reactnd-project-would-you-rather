import { REMOVE_AUTHED_USER, SET_AUTHED_USER } from '../actions/authedUser'

export default function authedUserId(state = null, action) {
  switch(action.type) {
    case REMOVE_AUTHED_USER:
      return null
    case SET_AUTHED_USER:
      return action.authedUserId
    default:
      return state;
  }
}