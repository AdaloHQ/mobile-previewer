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

    let bindingData = selectorFunc(map, params, authToken)

    result[bindingId] = bindingData
  }

  return result
}
