import { actionTypes } from 'apto-constants'

import { createObject } from '../ducks/data'

export const executeAction = (action, dependencies, dispatch) => {
  let { actionType, eventType, options } = action

  if (actionType === actionTypes.CREATE_OBJECT) {
    let object = dependencies.fields
    let { datasourceId, tableId } = options

    console.log("CREATING OBJECT!!!!!!!!!!!!!!", datasourceId, tableId, object)
    dispatch(createObject(datasourceId, tableId, object))
  } else {
    console.error(`I don't know how to "${actionType}"`)
  }
}
