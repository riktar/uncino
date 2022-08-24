/**
 * Returns a function which, when invoked, will execute all callbacks
 * registered to a hook of the specified type, optionally returning the final
 * value of the call chain.
 *
 * return a promise
 */
function createRunHook(hooks, storeKey, returnFirstArg = false) {
  return async function runHooks(hookName, ...args) {
    const hooksStore = hooks[storeKey];

    if (!hooksStore[hookName]) {
      hooksStore[hookName] = {
        handlers: [],
        runs: 0,
      };
    }

    hooksStore[hookName].runs++;

    const handlers = hooksStore[hookName].handlers;

    if (!handlers || !handlers.length) {
      return returnFirstArg ? args[0] : undefined;
    }

    const hookInfo = {
      name: hookName,
      currentIndex: 0,
    };

    hooksStore.__current.push(hookInfo);

    while (hookInfo.currentIndex < handlers.length) {
      const handler = handlers[hookInfo.currentIndex];

      try {
        const result = await handler.callback.apply(null, args);
        if (returnFirstArg) {
          args[0] = result;
        }
        hookInfo.currentIndex++;
      } catch (error) {
        if (returnFirstArg) {
          throw new Error(error);
        }
        hookInfo.currentIndex++;
        console.error(error);
      }
    }

    hooksStore.__current.pop();

    if (returnFirstArg) {
      return args[0];
    }
  };
}

export default createRunHook;
