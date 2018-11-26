import { SET_DOCUMENT_SIZE } from '../actions/dom'

export default function dom(state = {}, action) {
  switch(action.type) {
    case SET_DOCUMENT_SIZE:
      return {
        ...state,
        ...action.document,
      }
    default:
      return state
  }
}