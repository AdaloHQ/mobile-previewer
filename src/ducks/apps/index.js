import uuid from 'uuid'

import { mergeReducers } from '../../utils/reducers'
import {
  requestAll,
  requestApp as requestSingle,
  uploadSketchFile as uploadSketch
} from '../../utils/io'
import datasourcesReducer from './datasources'
import dataBindingsReducer from './dataBindings'
import linksReducer from './links'

const LOAD_APP = Symbol('LOAD_APP')
const LOAD_APPS_LIST = Symbol('LOAD_APPS_LIST')
const REQUEST_ALL = Symbol('REQUEST_ALL')
const REQUEST_APP = Symbol('REQUEST_APP')
const UPLOAD_SKETCH_START = Symbol('UPLOAD_SKETCH_START')
const UPLOAD_SKETCH_SUCCESS = Symbol('UPLOAD_SKETCH_SUCCESS')
const UPLOAD_SKETCH_ERROR = Symbol('UPLOAD_SKETCH_ERROR')

const INITIAL_STATE = {
  apps: {},
  list: [],
  loading: false,
  uploadInProgress: false
}

// REDUCER

export default mergeReducers(
  INITIAL_STATE,
  datasourcesReducer,
  dataBindingsReducer,
  linksReducer,
  (state, action) => {
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
  
    if (action.type === UPLOAD_SKETCH_START) {
      return {
        ...state,
        uploadInProgress: true
      }
    }
  
    if (action.type === UPLOAD_SKETCH_SUCCESS) {
      return {
        ...state,
        uploadInProgress: false
      }
    }
  }
)

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

export const getUploadInProgress = state => {
  return state.apps.uploadInProgress
}

export const getScreens = (state, appId) => {
  let app = state.apps.apps[appId]
  let components = Object.keys(app.components).map(id => ({
    ...app.components[id],
    id
  }))

  return components
}

export const getLoading = state => {
  return state.apps.loading
}
