import * as data from '../utils/_DATA'

export const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function loadUsers() {
  return (dispatch) => {
    data._getUsers().then(users => {
      dispatch(receiveUsers(users))
    })
  }
}