import { push, peek, pop, createStack } from '../stacks'

test('all together', () => {
  let stack = createStack()

  stack = push(stack, 0)
  stack = push(stack, 1)
  stack = push(stack, 2)

  expect(peek(stack)).toEqual(2)

  let [head, newStack] = pop(stack)

  expect(head).toEqual(2)
  expect(newStack).toEqual([1, 0])
})

test('push()', () => {
  let stack = [1, 2, 3]
  let result = push(stack, 0)

  expect(stack).not.toBe(result)
  expect(result).toEqual([0, 1, 2, 3])
})

test('peek()', () => {
  let stack = [1, 2, 3]

  expect(peek(stack)).toEqual(1)
})

test('pop()', () => {
  let stack = [1, 2, 3]

  let [result, newStack] = pop(stack)

  expect(result).toEqual(1)
  expect(newStack).toEqual([2, 3])
})

