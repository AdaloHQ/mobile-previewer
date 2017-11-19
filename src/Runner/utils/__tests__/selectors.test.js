import {
  default as selectors,
  currentUserSelector
} from '../selectors'

import { fakeJWT } from '../jwt'

test('currentUserSelector', () => {
  let usersMap = {
    '1': {
      id: 1,
      name: 'Jason'
    },
    '2': {
      id: 2,
      name: 'Samantha'
    }
  }

  let token = fakeJWT({ userId: 2 })

  expect(currentUserSelector(null, token)).toEqual(2)
})
