import { sourceTypes, actionTypes } from 'apto-constants'

import { values } from './arrays'
import { getTableData } from '../ducks/data'
import { unsafeGetToken } from '../ducks/auth'
import { getValue } from '../ducks/formInputs'

import selectors from './selectors'

export const buildMapFunc = (component, params) => state => {
  let { dataBindings } = component

  let result = {}

  for (let bindingId in dataBindings) {
    let binding = dataBindings[bindingId]

    let { source } = binding
    let { datasourceId, tableId, fieldId, selector } = source
    let authToken = unsafeGetToken(datasourceId)

    let map = getTableData(state, tableId)

    let bindingData = map

    if (map && selector) {
      let selectorFunc = selectors[selector.type]

      if (!map || !selectorFunc) { continue }

      let id = selectorFunc(params, authToken)
      bindingData = map[id]
    }

    if (bindingData) {
      result[bindingId] = fieldId ? bindingData[fieldId] : values(bindingData)
    }
  }

  return result
}

export const getActionDependencies = (state, component, object) => {
  let values = {}

  let actions = (component.actions || {})[object.id] || {}

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

        if (!source || source.type !== sourceTypes.INPUT) {
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

    let { source } = binding
    let { datasourceId, tableId, fieldId, selector } = source
    let authToken = unsafeGetToken(datasourceId)

    if (!datasourceId || !tableId) { continue }

    let id = null

    if (selector) {
      let selectorFunc = selectors[selector.type]
      id = selectorFunc(params, authToken)
    }

    let cacheKey = `${datasourceId}.${tableId}`

    if (id) { cacheKey = `${cacheKey}.${id}` }

    if (cache[cacheKey]) { continue }

    cache[cacheKey] = true

    result.push([datasourceId, tableId, id])
  }

  return result
}

export const bindingValue = (id, binding, bindingData, parentBindingData) => {
  return bindingSourceValue(id, binding.source, bindingData, parentBindingData)
}

const bindingSourceValue = (id, source, bindingData, parentBindingData) => {
  let parentVal = null

  if (source.source) {
    parentVal = bindingSourceValue(
      id, source.source, bindingData, parentBindingData)
  }

  if (source.type === sourceTypes.FIELD) {
    let { fieldId } = source
    return parentVal && parentVal[fieldId]
  }

  if (source.type === sourceTypes.DATA) {
    return bindingData[id]
  }

  if (source.type === sourceTypes.LIST_ITEM) {
    let { listObjectId } = source
    return parentBindingData[listObjectId]
  }
}
