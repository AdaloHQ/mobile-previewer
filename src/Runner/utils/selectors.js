import { CURRENT_USER_SELECTOR } from 'apto-constants'

import { getPayload } from './jwt'

export const currentUserSelector = (params, authToken) => {
  let { userId } = getPayload(authToken)
  return userId
}

export default {
  [CURRENT_USER_SELECTOR]: currentUserSelector
}
