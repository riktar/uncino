/**
 * Validate a hookName string.
 *
 * The hook name to validate. Should be a non empty string containing
 * only numbers, letters, dashes, periods and underscores. Also,the hook name cannot begin with `__`.
 */
export function validateHookName(hookName) {
  if ('string' !== typeof hookName || '' === hookName) {
    console.error('The hook name must be a non-empty string.');
    return false;
  }

  if (/^__/.test(hookName)) {
    console.error('The hook name cannot begin with `__`.');
    return false;
  }

  if (!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(hookName)) {
    console.error(
      'The hook name can only contain numbers, letters, dashes, periods and underscores.'
    );
    return false;
  }

  return true;
}
