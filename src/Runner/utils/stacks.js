import immutabilityHelper from 'immutability-helper'

export const createStack = () => ([])

export const push = (stack, newValue) => {
  return immutabilityHelper(stack, {
    $splice: [[0, 0, newValue]]
  })
}

export const peek = (stack, offset=0) => {
  return stack[offset]
}

export const pop = stack => {
  let head = stack[0]
  let newStack = immutabilityHelper(stack, {
    $splice: [[0, 1]]
  })

  return [
    head,
    newStack
  ]
}
