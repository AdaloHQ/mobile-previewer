import { SOURCE_TYPE_INPUT, actionTypes } from 'apto-constants'

import { getTableData } from '../ducks/data'
import { unsafeGetToken } from '../ducks/auth'
import { getValue } from '../ducks/formInputs'

import selectors from './selectors'

export const buildMapFunc = (component, params) => state => {
  let { dataBindings } = component

  let result = {}

  for (let bindingId in dataBindings) {
    let binding = dataBindings[bindingId]

    let { datasourceId, tableId, fieldId, selector } = binding
    let authToken = unsafeGetToken(datasourceId)

    let selectorFunc = selectors[selector.type]    
    let map = getTableData(state, tableId)

    if (!map || !selectorFunc) { continue }

    let id = selectorFunc(params, authToken)
    let bindingData = map[id]

    if (bindingData) {
      result[bindingId] = bindingData[fieldId]
    }
  }

  // console.log('BUILT DEPENDENCIES:', result)

  return result
}

export const getActionDependencies = (state, component, object) => {
  let values = {}

  let actions = component.actions[object.id] || {}

  Object.keys(actions).forEach(id => {
    let action = actions[id]

    let fieldTypes = [actionTypes.CREATE_OBJECT, actionTypes.UPDATE_OBJECTS]
    if (fieldTypes.indexOf(action.actionType) >= 0) {
      values[id] = {
        fields: {}
      }

      action.options.fields.forEach(field => {
        if (!field || !field.source || !field.fieldId) { return }

        let { source } = field

        if (!source || source.type !== SOURCE_TYPE_INPUT) {
          return console.error(`Unsupported source type: ${source.type}`)
        }

        values[id].fields[field.fieldId] = getValue(state, source.objectId)
      })
    }
  })

  return values
}

export const getDependencies = (component, params) => {
  let { dataBindings } = component

  let result = []

  let cache = {}

  for (let bindingId in dataBindings) {
    let binding = dataBindings[bindingId]

    let { datasourceId, tableId, fieldId, selector } = binding
    let authToken = unsafeGetToken(datasourceId)

    let selectorFunc = selectors[selector.type]    
    let id = selectorFunc(params, authToken)

    let cacheKey = `${datasourceId}.${tableId}.${id}`

    if (cache[cacheKey]) { continue }

    cache[cacheKey] = true

    result.push([datasourceId, tableId, id])
  }

  return result
}
