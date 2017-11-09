export const mergeReducers = (initialState, ...reducers) => {
  return (state=initialState, action) => {
    for (let i = 0; i < reducers.length; i += 1) {
      let result = reducers[i](state, action)

      if (result !== undefined && result !== state) {
        return result
      }
    }

    return state
  }
}
