import ActionTypes from '../../constants/ActionTypes'

function newLoginState (username, token) {
  return {
    'username': username,
    'token': token
  }
}
export const initialState = newLoginState('', '')

function createReducer (initialState) {
  return (state = initialState, action) => {
    if (action && action.type === ActionTypes.loggedIn) {
      var username = action.payload.username
      var token = action.payload.token

      return newLoginState(username, token)
    }

    return state
  }
}

export default createReducer(initialState)
