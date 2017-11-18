import { AsyncStorage } from 'react-native'
import axios from 'axios'

import { loginUrl } from '../utils/urls'

const tokenKey = datasourceId => `SESSION_TOKEN-${datasourceId}`

const LOAD_SUCCESS = Symbol('LOAD_SUCCESS')
const LOAD_FAILURE = Symbol('LOAD_FAILURE')

const INITIAL_STATE = {
  tokens: {},
  activeAuth: null
}

export default (state=INITIAL_STATE, action) => {
  if (action.type === LOAD_SUCCESS) {
    let { datasourceId, token } = action

    console.log("LOAD SUCCESS", token)

    return {
      ...state,
      activeAuth: null,
      tokens: {
        ...state.tokens,
        [datasourceId]: token
      }
    }
  }

  if (action.type === LOAD_FAILURE) {
    let { datasourceId } = action

    console.log("LOAD FAILURE")

    return {
      ...state,
      activeAuth: datasourceId
    }
  }

  return state
}

// ACTIONS

export const restartSession = datasourceId => dispatch => {
  console.log("RESTARTING...", datasourceId)
  AsyncStorage.getItem(tokenKey(datasourceId))
    .then(token => {
      if (token !== null) {
        dispatch({ type: LOAD_SUCCESS, token })
      } else {
        console.log("NOT FOUND. SHOWING LOGIN.")
        dispatch({ type: LOAD_FAILURE, datasourceId })
      }
    })
}

export const authenticate = (datasourceId, data) => dispatch => {
  axios.post(loginUrl(datasourceId), data)
    .then(response => {
      AsyncStorage.setItem(tokenKey(datasourceId), response.data.token)
        .catch(() => console.error('Error storing token to AsyncStorage'))

      dispatch({ type: LOAD_SUCCESS, token: response.data.token })
    })
    .catch(err => {
      console.log("ERROR:", err)
      dispatch({ type: LOAD_FAILURE, datasourceId })
    })
}

// SELECTORS

export const getAuthenticated = state => {
  return Object.keys(state.auth.tokens).length > 0
}

export const getAuthScreenVisible = state => {
  console.log("ACTIVE AUTH:", state.auth.activeAuth)
  return !!state.auth.activeAuth
}

export const getActiveAuth = state => {
  return state.auth.activeAuth
}
