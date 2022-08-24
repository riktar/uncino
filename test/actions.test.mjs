'use strict'

import {test} from 'tap'
import uncino from '../src/index.mjs';


test('uncino add action', async (t) => {
  const hooks = uncino()

  hooks.addAction('console', 'namespace', async (number) => {
    console.log('console 1', number + 1)
  }, 1)

  hooks.addAction('console', 'namespace', async (number) => {
    console.log('console 2', number + 2)
  }, 2)

  t.ok(hooks.hasAction('console'))

  const myNumber = 3
  t.resolves(hooks.runAction('console', myNumber))
})

test('uncino hook exception', async (t) => {
  const hooks = uncino()

  hooks.addAction('test', 'namespace', async (number) => {
    console.log('console 3', number + 1)
  }, 1)

  hooks.addAction('testError', 'namespace', async (number) => {
    throw new Error('Error logged by uncino')
    // runAction will log this error in console
  }, 1)

  const myNumber = 3

  t.resolves(hooks.runAction('test', myNumber))
  t.resolves(hooks.runAction('testError', myNumber))
})

test('remove action', async (t) => {
  const hooks = uncino()

  hooks.addAction('test', 'namespace', async (number) => {
  }, 1)

  hooks.addAction('test', 'namespace2', async (number) => {
  }, 2)

  t.resolves(hooks.runAction('test', 5))

  hooks.removeAction('test', 'namespace2')
  t.notOk(hooks.hasAction('test', 'namespace2'))

  t.resolves(hooks.runAction('test', 5))
})

test('remove all actions', async (t) => {
  const hooks = uncino()

  hooks.addAction('test', 'namespace', async (number) => {
  }, 1)

  hooks.addAction('test', 'namespace2', async (number) => {
  }, 2)

  t.resolves(hooks.runAction('test', 5))

  hooks.removeAllActions('test')
  t.notOk(hooks.hasAction('test', 'namespace'))
  t.notOk(hooks.hasAction('test', 'namespace2'))

  t.resolves(hooks.runAction('test', 5))
})

