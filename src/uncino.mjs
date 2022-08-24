/**
 * Internal dependencies
 */
import createAddHook from './createAddHook.mjs'
import createRemoveHook from './createRemoveHook.mjs'
import createHasHook from './createHasHook.mjs'
import createRunHook from './createRunHook.mjs'
// import createCurrentHook from './createCurrentHook';
// import createDoingHook from './createDoingHook';
// import createDidHook from './createDidHook';

/**
 * Internal class for constructing hooks. Use `uncino()` function
 * Note, it is necessary to expose this class to make its type public.
 */
class _Uncino {
  constructor() {
    /** actions */
    this.actions = {};
    this.actions.__current = [];

    /** filters */
    this.hooks = {};
    this.hooks.__current = [];

    this.addAction = createAddHook(this, 'actions');
    this.addHook = createAddHook(this, 'hooks');
    this.removeAction = createRemoveHook(this, 'actions');
    this.removeHook = createRemoveHook(this, 'hooks');
    this.hasAction = createHasHook(this, 'actions');
    this.hasHook = createHasHook(this, 'hooks');
    this.removeAllActions = createRemoveHook(this, 'actions', true);
    this.removeAllHooks = createRemoveHook(this, 'hooks', true);
    this.runAction = createRunHook(this, 'actions');
    this.runHook = createRunHook(this, 'hooks', true);
    // this.currentAction = createCurrentHook( this, 'actions' );
    // this.currentFilter = createCurrentHook( this, 'filters' );
    // this.doingAction = createDoingHook( this, 'actions' );
    // this.doingFilter = createDoingHook( this, 'filters' );
    // this.didAction = createDidHook( this, 'actions' );
    // this.didFilter = createDidHook( this, 'filters' );
  }
}

/**
 * Returns an instance of the hooks object.
 */
function uncino() {
  return new _Uncino();
}

export default uncino;