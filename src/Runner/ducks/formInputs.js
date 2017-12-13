const CHANGE_VALUE = Symbol('CHANGE_VALUE')

const INITIAL_STATE = {}

// REDUCER

export default (state=INITIAL_STATE, action) => {
  if (action.type = CHANGE_VALUE) {
    return {
      ...state,
      [action.objectId]: action.value
    }
  }

  return INITIAL_STATE
}

// ACTIONS

export const changeValue = (objectId, value) => ({
  type: CHANGE_VALUE,
  objectId,
  value
})

// SELECTORS

export const getValue = (state, objectId) => {
  return state.formInputs[objectId]
}
