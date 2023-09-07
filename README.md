# Uncino 🪝

> Fast, tiny and solid hooks system for Javascript and NodeJS
> 
> **Uncino** is italian word for *hook*

![Uncino - Fast, tiny and solid hooks system for Javascript and NodeJS](https://cdn.hashnode.com/res/hashnode/image/upload/v1662032725209/-hgyTmeyd.jpg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp)

Do you know Wordpress hooks system? Uncino is a hooks system highly inspired to it!

- Async / Await support
- Node or Browser support
- Actions / Hooks system
- Easy to use
- No Dependencies

## Support this project

[Buy me a coffee](https://github.com/sponsors/riktar)

## Installation

`npm i uncino` or `yarn add uncino`

## Quick example

```js index.js
const uncino = require('uncino')
const hooks = uncino()

hooks.addHook('test', 'namespace', async (number) => {
  return number + 10
})

hooks.addHook('test', 'namespace', async (number) => {
  return number + 20
})

async function testHook(myNumber) {
  const newNumber = await hooks.runHook('test', myNumber)
  console.log(myNumber, newNumber)
}

testHook(3)  // 3 33
testHook(10)  // 10 40
```

## Philosophy

Uncino permit to your code to interact/modify another piece of code at specific, pre-defined spots.

Uncino has two types of hooks: **Actions and Hooks**. To use either, you need to write a custom function, and then register for a specific action or hook.

**Actions** allow you to add data or change how your code operates. Actions will run at a specific point in the execution. Callback functions for Actions can perform some kind of a task, like echoing output to the user or inserting something into the database. Callback functions for an Action do not return anything back to the calling Action hook.

**Hooks** give you the ability to change data during the execution of your code. Callback functions for Hooks will accept a variable, modify it, and return it. They are meant to work in an isolated manner, and should never have side effects such as affecting global variables and output. Hooks expect to have something returned back to them.

With Uncino you can create your own hook spots so that other developers can extend and modify your code or you can create your pluggable core.

## Hooks API

Method Name           | Arguments                                        | Description
----------------------|--------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------
`addHook `            | `hookName, namespace, callback, priority`        | Register `callback` as new `hook` for `hookName` in `namespace` with `priority` (default: `10`).
`removeHook`          | `hookName, namespace`                            | Remove hook for `hookName` in `namespace`
`hasHook `            | `hookName, namespace`                            | Check if hook for `hookName` in `namespace` exists
`removeAllHooks`      | `hookName`                                       | Remove all hooks for `hookName`
`runHook`             | `hookName, params`                               | Run hook for `hookName` with `params`.  It returns a `Promise` with the hook result

## Actions API

Method Name             | Arguments                                    | Description
------------------------|----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------
`addAction `            | `actionName, namespace, callback, priority`  | Register `callback` as new `action` for `actionName` in `namespace` with `priority` (default: `10`).
`removeAction`          | `actionName, namespace`                      | Remove hook for `actionName` in `namespace`
`hasAction `            | `actionName, namespace`                      | Check if hook for `actionName` in `namespace` exists
`removeAllActions`      | `actionName`                                 | Remove all actionss for `actionName`
`runAction`             | `actionName, params`                         | Run action for `actionName` with `params`.  It returns a `Promise` with void value

## Example
Clone the repo and look in the `test` folder

## Develop
Clone the repo then use `npm install` for download all the dependencies then launch `npm run build` for build the project

## Pull Requests?
I'd love them!

## Comments?
Let's hear them! (The nice ones please!)

## Me?
In case you're interested I'm [@argonautadev](http://twitter.com/argonautadev)
