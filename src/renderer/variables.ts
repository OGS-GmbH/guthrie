"use client";

import type { Access } from "./type.js";

/**
 * Resolves a value by applying an access chain {@link Access}.
 *
 * Iteratively applies each access descriptor to the given value,
 * allowing traversal of nested properties, indices, and prototype methods.
 *
 * Prototype access is executed as a function call and may be asynchronous.
 *
 * @param value - Initial value to resolve from
 * @param access - Access chain describing how to traverse the value
 *
 * @returns Promise resolving to the final accessed value
 *
 * @since 1.0.0
 * @category Internal
 * @internal
 * @author Simon Kovtyk
 * @author David Schummer
 */
async function touchByAccessAsync<T>(value: unknown, access: Access): Promise<T> {
  let touchedValue: T = value as T;

  for (const accessItem of access) {
    switch (accessItem.type) {
      case "prototype":
        if (accessItem.optional)
          touchedValue = await (touchedValue as Record<string, () => T>)?.[accessItem.read]?.() ?? touchedValue;
        else
          touchedValue = await (touchedValue as Record<string, () => T>)[accessItem.read]!();
        break;

      default:
        if (accessItem.optional)
          touchedValue = (touchedValue as Record<string, T>)?.[accessItem.read] ?? touchedValue;
        else
          touchedValue = (touchedValue as Record<string, T>)[accessItem.read]!;
    }
  }

  return touchedValue;
}

function touchByAccessSync<T>(value: unknown, access: Access): T {

  let touchedValue: T = value as T;

  for (const accessItem of access) {
    switch (accessItem.type) {
      case "prototype":
        if (accessItem.optional)
          touchedValue = (touchedValue as Record<string, () => T>)?.[accessItem.read]?.() ?? touchedValue;
        else
          touchedValue = (touchedValue as Record<string, () => T>)[accessItem.read]!();
        break;

      default:
        if (accessItem.optional)
          touchedValue = (touchedValue as Record<string, T>)?.[accessItem.read] ?? touchedValue;
        else
          touchedValue = (touchedValue as Record<string, T>)[accessItem.read]!;
    }
  }

  return touchedValue;
}

export { touchByAccessAsync, touchByAccessSync };
