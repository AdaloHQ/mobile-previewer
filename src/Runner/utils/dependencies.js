import { getTableData } from '../ducks/data'
import { unsafeGetToken } from '../ducks/auth'

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

    result[bindingId] = bindingData[fieldId]
  }

  console.log('BUILT DEPENDENCIES:', result)

  return result
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
