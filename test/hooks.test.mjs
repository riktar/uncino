'use strict'

import {test} from 'tap'
import uncino from '../src/index.mjs';


test('add hook', async (t) => {
  const hooks = uncino()

  hooks.addHook('test', 'namespace', async (number) => {
    return number + 1
  }, 1)

  hooks.addHook('test', 'namespace2', async (number) => {
    return number + 2
  }, 2)

  const myNumber = 3
  const newNumber = await hooks.runHook('test', myNumber)
  t.equal(newNumber, myNumber + 3)

  const testEmpty = await hooks.runHook('testEmpty', myNumber)
  t.equal(testEmpty, myNumber)
})

test('hook exception', async (t) => {
  const hooks = uncino()

  hooks.addHook('test', 'namespace', async (number) => {
    return number + 1
  }, 1)

  hooks.addHook('testError', 'namespace2', async (number) => {
    throw new Error('test')
  }, 1)

  const myNumber = 3
  const newNumber = await hooks.runHook('test', myNumber)

  t.equal(newNumber, myNumber + 1)
  t.rejects(hooks.runHook('testError', myNumber))
})

test('remove hook', async (t) => {
  const hooks = uncino()

  hooks.addHook('test', 'namespace', async (number) => {
    return number + 1
  }, 1)

  hooks.addHook('test', 'namespace2', async (number) => {
    return number + 2
  }, 2)

  t.ok(hooks.hasHook('test', 'namespace'))
  t.ok(hooks.hasHook('test', 'namespace2'))

  const myNumber = 3
  const newNumber = await hooks.runHook('test', myNumber)
  t.equal(newNumber, myNumber + 3)

  hooks.removeHook('test', 'namespace2')
  t.ok(hooks.hasHook('test', 'namespace'))
  t.notOk(hooks.hasHook('test', 'namespace2'))

  const newNumber2 = await hooks.runHook('test', myNumber)
  t.equal(newNumber2, myNumber + 1)
})

test('remove all hooks', async (t) => {
  const hooks = uncino()

  hooks.addHook('test', 'namespace', async (number) => {
    return number + 1
  }, 1)

  hooks.addHook('test', 'namespace2', async (number) => {
    return number + 2
  }, 2)

  const myNumber = 3
  const newNumber = await hooks.runHook('test', myNumber)
  t.equal(newNumber, myNumber + 3)

  hooks.removeAllHooks('test')
  t.notOk(hooks.hasHook('test', 'namespace'))
  t.notOk(hooks.hasHook('test', 'namespace2'))

  const newNumber2 = await hooks.runHook('test', myNumber)
  t.equal(newNumber2, myNumber)
})
