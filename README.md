# Uncino

> Fast, tiny and solid hooks system for Javascript

Do you know Wordpress hooks system? Uncino is a hook system highly inspired to it!

## Installation

`npm i uncino` or `yarn add uncino`

## Quick example

```js index.js
const uncino = require('uncino')
const hooks = uncino()

async function start() {
  hooks.addHook('test', 'namespace', async (number) => {
    return number + 10
  }, 1)

  hooks.addHook('test', 'namespace', async (number) => {
    return number + 20
  }, 2)

  const myNumber = 3
  const newNumber = await hooks.runHook('test', myNumber)
  console.log(myNumber, newNumber) // 3 33
}

start()
```

Docs coming soon