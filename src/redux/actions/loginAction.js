import ActionTypes from '../../constants/ActionTypes'

export function login (username, token) {
  return {
    'type': ActionTypes.loggedIn,
    'payload': {
      'username': username,
      'token': token
    }
  }
}
