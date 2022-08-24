/**
 * Returns a function which, when invoked, will return whether any handlers are
 * attached to a particular hook.
 */
function createHasHook( hooks, storeKey ) {
  return function hasHook( hookName, namespace ) {
    const hooksStore = hooks[ storeKey ];

    // Use the namespace if provided.
    if ( 'undefined' !== typeof namespace ) {
      return (
        hookName in hooksStore &&
        hooksStore[ hookName ].handlers.some(
          ( hook ) => hook.namespace === namespace
        )
      );
    }

    return hookName in hooksStore;
  };
}

export default createHasHook;
