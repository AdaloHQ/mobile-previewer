import { CURRENT_USER_SELECTOR } from 'apto-constants'

const selectors = {
  [CURRENT_USER_SELECTOR]: () => {}
}

export const buildMapFunc = (component, params) => state => {
  let { dataBindings } = component

  let result = {}

  for (let bindingId in dataBindings) {
    let binding = dataBindings[bindingId]
  }

  return {}
}
