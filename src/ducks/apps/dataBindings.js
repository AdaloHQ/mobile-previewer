import immutabilityHelper from 'immutability-helper'

import { setDataBinding } from '../../utils/io'

const ATTACH_DATA_BINDING = Symbol('ATTACH_DATA_BINDING')
const REMOVE_DATA_BINDING = Symbol('REMOVE_DATA_BINDING')

export default (state, action) => {
  if (action.type === ATTACH_DATA_BINDING) {
    let { appId, componentId, objectId, binding } = action

    setDataBinding({ appId, componentId, objectId, binding })

    return immutabilityHelper(state, {
      apps: {
        [appId]: {
          components: {
            [componentId]: {
              dataBindings: {
                [objectId]: {
                  $set: binding
                }
              }
            }
          }
        }
      }
    })
  }

  if (action.type === REMOVE_DATA_BINDING) {
    let { appId, componentId, objectId } = action

    setDataBinding({ appId, componentId, objectId, binding: null })

    return immutabilityHelper(state, {
      apps: {
        [appId]: {
          components: {
            [componentId]: {
              dataBindings: {
                $unset: [objectId]
              }
            }
          }
        }
      }
    })
  }
}

// ACTIONS

// { appId, componentId, objectId, binding }
export const attachDataBinding = (opts) => {
  return {
    ...opts,
    type: ATTACH_DATA_BINDING
  }
}

// { appId, componentId, objectId }
export const removeDataBinding = (opts) => ({
  ...opts,
  type: REMOVE_DATA_BINDING
})

// SELECTORS

export const getDataBindings = (state, appId, componentId) => {
  return (
    state.apps.apps[appId] &&
    state.apps.apps[appId].components[componentId] &&
    state.apps.apps[appId].components[componentId].dataBindings
  ) || {}
}

// returns more details about a particular object's binding
export const getDataBinding = (state, appId, componentId, objectId) => {
  let binding = getDataBindings(state, appId, componentId)[objectId]

  if (!binding) { return binding }

  let datasource = state.apps.apps[appId].datasources[binding.datasourceId]
  let table = datasource.tables[binding.tableId]
  let field = table.fields[binding.fieldId]

  return {
    ...binding,
    datasource,
    table,
    field
  }
}
