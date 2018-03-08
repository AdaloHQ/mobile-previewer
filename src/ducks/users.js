const SET_CURRENT_USER = Symbol('SET_CURRENT_USER')
const SET_AUTH_VISIBLE = Symbol('SET_AUTH_VISIBLE')

const INITIAL_STATE = {
  currentUser: null,
  authVisible: false,
}

// Reducer

export default (state = INITIAL_STATE, action) => {
  if (action.type === SET_CURRENT_USER) {
    let { userObject } = action

    return {
      ...state,
      currentUser: userObject,
      authVisible: false
    }
  }

  if (action.type === SET_AUTH_VISIBLE) {
    return {
      ...state,
      authVisible: true
    }
  }

  return state
}

// Actions

export const setCurrentUser = userObject => ({
  type: SET_CURRENT_USER,
  userObject
})

export const setAuthVisible = () => ({
  type: SET_AUTH_VISIBLE
})

// Selectors

export const getCurrentUser = state => {
  return state.users.currentUser
}

export const getAuthVisible = state => {
  return state.users.authVisible
}
