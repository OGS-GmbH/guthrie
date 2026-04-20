"use client";

/**
 * Normalizes a target into a consistent string identifier.
 *
 * Used internally to map DOM targets (elements, window, or string references)
 * to a unified key for storage and lookup.
 *
 * @param target - Target element, window, or reference name
 *
 * @returns Normalized target name
 *
 * @since 1.0.0
 * @category Internal
 * @internal
 * @author Simon Kovtyxk
 */
function normalizeTargetName(target: HTMLElement | Window | string): string {
  if (typeof target === "string") return target;

  if (target instanceof Window) return "window";

  return target.toString();
}

export { normalizeTargetName };
