/**
 * Internal dependencies
 */
import {validateNamespace} from './validator/validateNamespace.mjs'
import {validateHookName} from './validator/validateHookName.mjs'

/**
 * Returns a function which, when invoked, will remove a specified hook or all
 * hooks by the given name.
 */
function createRemoveHook( hooks, storeKey, removeAll = false ) {
  return function removeHook( hookName, namespace ) {
    const hooksStore = hooks[ storeKey ];

    if ( ! validateHookName( hookName ) ) {
      return;
    }

    if ( ! removeAll && ! validateNamespace( namespace ) ) {
      return;
    }

    // Bail if no hooks exist by this name.
    if ( ! hooksStore[ hookName ] ) {
      return 0;
    }

    let handlersRemoved = 0;

    if ( removeAll ) {
      handlersRemoved = hooksStore[ hookName ].handlers.length;
      hooksStore[ hookName ] = {
        runs: hooksStore[ hookName ].runs,
        handlers: [],
      };
    } else {
      // Try to find the specified callback to remove.
      const handlers = hooksStore[ hookName ].handlers;
      for ( let i = handlers.length - 1; i >= 0; i-- ) {
        if ( handlers[ i ].namespace === namespace ) {
          handlers.splice( i, 1 );
          handlersRemoved++;
          // This callback may also be part of a hook that is
          // currently executing.  If the callback we're removing
          // comes after the current callback, there's no problem;
          // otherwise we need to decrease the execution index of any
          // other runs by 1 to account for the removed element.
          hooksStore.__current.forEach( ( hookInfo ) => {
            if (
              hookInfo.name === hookName &&
              hookInfo.currentIndex >= i
            ) {
              hookInfo.currentIndex--;
            }
          } );
        }
      }
    }

    if ( hookName !== 'hookRemoved' ) {
      hooks.runAction( 'hookRemoved', hookName, namespace );
    }

    return handlersRemoved;
  };
}

export default createRemoveHook;
