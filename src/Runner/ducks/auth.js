import { AsyncStorage } from 'react-native'
import axios from 'axios'

import { loginUrl } from '../utils/urls'

const LOAD_SUCCESS = Symbol('LOAD_SUCCESS')
const LOAD_FAILURE = Symbol('LOAD_FAILURE')

const tokens = {}

export const unsafeGetToken = datasourceId => {
  return tokens[datasourceId]
}

const tokenKey = datasourceId => {
  if (!datasourceId) {
    throw new Error('datasourceId cannot be blank')
  }

  return `SESSION_TOKEN-${datasourceId}`
}

const INITIAL_STATE = {
  tokens: {},
  activeAuth: null
}

export default (state=INITIAL_STATE, action) => {
  if (action.type === LOAD_SUCCESS) {
    let { datasourceId, token } = action

    console.log("SUCCESSFULLY GOT TOKEN:", datasourceId, token)

    tokens[datasourceId] = token

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

    return {
      ...state,
      activeAuth: datasourceId
    }
  }

  return state
}

// ACTIONS

export const restartSession = datasourceId => dispatch => {
  AsyncStorage.getItem(tokenKey(datasourceId))
    .then(token => {
      if (token !== null) {
        dispatch({ type: LOAD_SUCCESS, datasourceId, token })
      } else {
        dispatch({ type: LOAD_FAILURE, datasourceId })
      }
    })
}

export const authenticate = (datasourceId, data) => dispatch => {
  axios.post(loginUrl(datasourceId), data)
    .then(response => {
      AsyncStorage.setItem(tokenKey(datasourceId), response.data.token)
        .catch(() => console.error('Error storing token to AsyncStorage'))

      dispatch({ type: LOAD_SUCCESS, datasourceId, token: response.data.token })
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
  return !!state.auth.activeAuth
}

export const getActiveAuth = state => {
  return state.auth.activeAuth
}
