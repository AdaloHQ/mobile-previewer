import uuid from 'uuid'

import {
  requestAll,
  requestApp as requestSingle,
} from '../utils/io'

const LOAD_APP = Symbol('LOAD_APP')
const LOAD_APPS_LIST = Symbol('LOAD_APPS_LIST')
const REQUEST_ALL = Symbol('REQUEST_ALL')
const REQUEST_APP = Symbol('REQUEST_APP')

const INITIAL_STATE = {
  apps: {},
  list: [],
  loading: false,
}

// REDUCER

export default (state = INITIAL_STATE, action) => {
  if (action.type === REQUEST_ALL) {
    // Make call to API
    requestAll()

    return {
      ...state,
      loading: true
    }
  }

  if (action.type === REQUEST_APP) {
    let { appId } = action

    // Make call to API
    requestSingle(appId)

    return {
      ...state,
      apps: {
        ...state.apps,
        [appId]: null
      }
    }
  }

  if (action.type === LOAD_APP) {
    let { app } = action

    app = {
      ...app,
      hash: String(+(new Date()))
    }

    return {
      ...state,
      loading: false,
      apps: {
        ...state.apps,
        [app.id]: app
      }
    }
  }

  if (action.type === LOAD_APPS_LIST) {
    let { apps } = action

    return {
      ...state,
      loading: false,
      list: apps
    }
  }

  return state
}

// ACTIONS

export const loadApp = app => ({
  type: LOAD_APP,
  app
})

export const loadAppsList = apps => ({
  type: LOAD_APPS_LIST,
  apps
})

export const requestApps = () => ({ type: REQUEST_ALL })
export const requestApp = appId => ({ type: REQUEST_APP, appId })

// SELECTORS

export const getApps = state => {
  return state.apps.list
}

export const getApp = (state, appId) => {
  return state.apps.apps[appId]
}

export const getLoading = state => {
  return state.apps.loading
}
