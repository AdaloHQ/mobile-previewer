import uuid from 'uuid'
import immutabilityHelper from 'immutability-helper'

import { saveDatasource } from '../../utils/io'

const CREATE_TABLE = Symbol('CREATE_TABLE')
const UPDATE_TABLE = Symbol('UPDATE_TABLE')
const ADD_TABLE_FIELD = Symbol('ADD_TABLE_FIELD')
const REMOVE_TABLE_FIELD = Symbol('ADD_TABLE_FIELD')

export default (state, action) => {
  if (action.type === CREATE_TABLE) {
    let { appId, datasourceId } = action

    let app = state.apps[appId]
    let datasource = app && app.datasources[datasourceId]

    let newState = immutabilityHelper(state, {
      apps: {
        [appId]: {
          datasources: {
            [datasourceId]: {
              tables: {
                [uuid.v4()]: {
                  $set: {
                    name: '',
                    fields: {}
                  }
                }
              }
            }
          }
        }
      }
    })

    saveDatasource(
      appId,
      datasourceId,
      newState.apps[appId].datasources[datasourceId]
    )

    return newState
  }

  if (action.type === UPDATE_TABLE) {
    let { appId, datasourceId, tableId, data } = action

    let app = state.apps[appId]
    let datasource = app && app.datasources[datasourceId]
    let table = datasource && datasource.tables[tableId]

    if (!table) { return state }

    let newState = immutabilityHelper(state, {
      apps: {
        [appId]: {
          datasources: {
            [datasourceId]: {
              tables: {
                [tableId]: {
                  $set: data
                }
              }
            }
          }
        }
      }
    })

    saveDatasource(
      appId,
      datasourceId,
      newState.apps[appId].datasources[datasourceId]
    )

    return newState
  }

  if (action.type === ADD_TABLE_FIELD) {
    let { appId, datasourceId, tableId, field } = action

    let app = state.apps[appId]
    let datasource = app && app.datasources[datasourceId]
    let table = datasource && datasource.tables[tableId]

    if (!table) { return state }

    let newState = immutabilityHelper(state, {
      apps: {
        [appId]: {
          datasources: {
            [datasourceId]: {
              tables: {
                [tableId]: {
                  fields: {
                    [uuid.v4()]: {
                      $set: field
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    saveDatasource(
      appId,
      datasourceId,
      newState.apps[appId].datasources[datasourceId]
    )

    return newState
  }

  if (action.type === REMOVE_TABLE_FIELD) {
    let { appId, datasourceId, tableId, fieldId } = action

    let app = state.apps[appId]
    let datasource = app && app.datasources[datasourceId]
    let table = datasource && datasource.tables[tableId]

    if (!table) { return state }

    let newState = immutabilityHelper(state, {
      apps: {
        [appId]: {
          datasources: {
            [datasourceId]: {
              tables: {
                [tableId]: {
                  fields: {
                    $unset: [fieldId]
                  }
                }
              }
            }
          }
        }
      }
    })

    saveDatasource(
      appId,
      datasourceId,
      newState.apps[appId].datasources[datasourceId]
    )

    return newState
  }
}

// ACTIONS

export const createTable = (appId, datasourceId) => ({
  type: CREATE_TABLE,
  appId,
  datasourceId
})

export const updateTable = (appId, datasourceId, tableId, data) => ({
  type: UPDATE_TABLE,
  appId,
  datasourceId,
  tableId,
  data
})

export const addTableField = (appId, datasourceId, tableId, field) => ({
  type: ADD_TABLE_FIELD,
  appId,
  datasourceId,
  tableId,
  field
})

export const removeTableField = (appId, datasourceId, tableId, fieldId) => ({
  type: REMOVE_TABLE_FIELD,
  appId,
  datasourceId,
  tableId,
  fieldId
})

// SELECTORS

export const getDatasources = (state, appId) => {
  let datasources = (state.apps.apps[appId] &&
    state.apps.apps[appId].datasources) || {}

  return Object.keys(datasources).map(id => ({
    ...datasources[id],
    id
  }))
}

