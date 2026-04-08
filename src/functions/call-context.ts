import type { Variables } from "../renderer/type";

/**
 * Module-level call context for threading runtime state across plain function calls.
 *
 * Since `addListener` and similar functions are registered in the function
 * registry and called via `callFn` without access to React context, this
 * module provides a synchronous, single-threaded call context that `callFn`
 * can populate before invoking a registry function.
 *
 * @remarks
 * JS is single-threaded in the main event loop, so setting this before a
 * synchronous function call (like `addListener`) and reading it inside that
 * call is safe and deterministic.
 *
 * @since 1.0.0
 * @category Internal
 * @internal
 * @author Simon Kovtyk
 */

let _scopedVariables: Variables | undefined;

/**
 * Sets the current call context scoped variables.
 *
 * Should be called by {@link callFn} immediately before invoking a registry function.
 *
 * @param variables - The scoped variables to make available to the callee
 *
 * @since 1.0.0
 * @category Internal
 * @internal
 */
function setScopedVariablesContext(variables: Variables | undefined): void {
  _scopedVariables = variables;
}

/**
 * Returns the current call context scoped variables.
 *
 * Should be called by registry functions (e.g. `addListener`) that need
 * access to the scoped variables active at the time they were invoked.
 *
 * @returns Current scoped variables, or `undefined` if none are set
 *
 * @since 1.0.0
 * @category Internal
 * @internal
 */
function getScopedVariablesContext(): Variables | undefined {
  return _scopedVariables;
}

export { setScopedVariablesContext, getScopedVariablesContext };
