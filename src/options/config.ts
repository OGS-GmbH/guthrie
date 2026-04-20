"use client";

import { ElementType } from "react";
import type { Elements, Fns, Operators } from "../renderer/type.js";
import { additional, flowControls, intrinsics } from "./elements.js";
import { internal, native } from "./fns.js";
import { universal, universalShort } from "./operations.js";

/**
 * Options for {@link withElements}.
 *
 * @since 1.0.0
 * @category Configuration
 * @author your name
 */
type WithElementsOptions = Partial<{
  intrinsics: boolean;
  additional: boolean;
  flowControls: boolean;
  mapNames: (value: string) => string;
}>;

const defaultElementOptions: WithElementsOptions = {
  intrinsics: true,
  additional: true,
  flowControls: true
};

/**
 * Builds the final elements registry.
 *
 * Merges user-provided elements with configured intrinsic, flow control,
 * and additional elements. Optionally applies name mapping.
 *
 * @param config - Configuration for elements and options
 *
 * @returns Combined elements registry
 *
 * @since 1.0.0
 * @category Configuration
 * @author Simon Kovtyk
 */
function withElements(
  config?: Partial<{
    elements: Elements;
    options: WithElementsOptions;
  }>
): Elements {
  let currentElements: Elements = {};

  if (config?.elements !== undefined) {
    if (config.options?.mapNames === undefined) currentElements = config.elements;
    else {
      for (const key in config.elements) {
        const currentKey = config.options?.mapNames ? config.options.mapNames(key) : key;

        currentElements[currentKey] = config.elements[key] as ElementType;
      }
    }
  }

  const configuredIntrinsics =
    (config?.options?.intrinsics ?? defaultElementOptions.intrinsics) ? intrinsics : {};

  for (const key in configuredIntrinsics) {
    const currentKey = config?.options?.mapNames ? config.options.mapNames(key) : key;

    currentElements[currentKey] = configuredIntrinsics[key] as ElementType;
  }

  const configuredFlowControls =
    (config?.options?.flowControls ?? defaultElementOptions.flowControls) ? flowControls : {};

  for (const key in configuredFlowControls) {
    const currentKey = config?.options?.mapNames ? config.options.mapNames(key) : key;

    currentElements[currentKey] = configuredFlowControls[key] as ElementType;
  }

  const configuredAdditional =
    (config?.options?.additional ?? defaultElementOptions.additional) ? additional : {};

  for (const key in configuredAdditional) {
    const currentKey = config?.options?.mapNames ? config.options.mapNames(key) : key;

    currentElements[currentKey] = configuredAdditional[key] as ElementType;
  }

  return currentElements;
}

/**
 * Options for {@link withFns}.
 *
 * @since 1.0.0
 * @category Configuration
 * @author Simon Kovtyk
 */
type WithFnsOptions = Partial<{
  /** Include natives functions {@link native} */
  native: boolean;
  /** Include internal functions {@link internal} */
  internal: boolean;
  mapNames: (value: string) => string;
}>;

const defaultFnsOptions: WithFnsOptions = {
  native: true,
  internal: true
};

/**
 * Config for {@link withFns}.
 *
 * @since 1.0.0
 * @category Configuration
 * @author Simon Kovtyk
 */
type WithFnsConfig = Partial<{
  fns: Fns;
  options: WithFnsOptions;
}>;

/**
 * Builds the final functions registry.
 *
 * Merges user-provided functions with optional native functions
 * and applies name mapping if configured.
 *
 * @param config - Functions and configuration options {@link WithFnsConfig}
 *
 * @returns Combined functions registry {@link Fns}
 *
 * @since 1.0.0
 * @category Configuration
 * @author Simon Kovtyk
 */
function withFns({ fns, options }: WithFnsConfig): Fns {
  const configuredNatives = (options?.native ?? defaultFnsOptions.native) ? native : {};
  const configuredInternals = (options?.internal ?? defaultFnsOptions.internal) ? internal : {};

  const fnsResult: Fns = {
    ...fns,
    ...configuredNatives,
    ...configuredInternals
  };

  return Object.fromEntries(
    Object.entries(fnsResult).map(([key, value]) => [
      options?.mapNames ? options?.mapNames(key) : key,
      value
    ])
  );
}

/**
 * Options for {@link withOperators}.
 *
 * @since 1.0.0
 * @category Configuration
 * @author Simon Kovtyk
 */
type WithOperatorOptions = Partial<{
  /** Include universal operators {@link universal} */
  universal: boolean;

  /**
   * Naming style for universal operators
   *
   * - "universal" → long names {@link universal}
   * - "guthrie" → short names (recommended) {@link universalShort}
   */
  universalNames: "universal" | "guthrie";
  mapNames: (value: string) => string;
}>;

const defaultOperatorOptions: WithOperatorOptions = {
  universal: true
};

/**
 * Config for {@link withOperators}.
 *
 * @since 1.0.0
 * @category Configuration
 * @author Simon Kovtyk
 */
type WithOperatorConfig = Partial<{
  operators: Operators;
  options: WithOperatorOptions;
}>;

/**
 * Builds the final operators registry.
 *
 * Merges user-provided operators with optional universal operators.
 *
 * @param config - Operators and configuration options {@link WithOperatorConfig}
 *
 * @returns Combined operators registry {@link Operators}
 *
 * @since 1.0.0
 * @category Configuration
 * @author MIMI
 */
function withOperators({ operators, options }: WithOperatorConfig): Operators {
  const configuredUniversal =
    (options?.universal ?? defaultOperatorOptions.universal)
      ? options?.universalNames === "universal"
        ? universal
        : universalShort
      : {};

  return {
    ...configuredUniversal,
    ...operators
  };
}

export type {
  WithElementsOptions,
  WithFnsOptions,
  WithFnsConfig,
  WithOperatorOptions,
  WithOperatorConfig
};

export {
  withElements,
  withFns,
  withOperators,
  defaultElementOptions,
  defaultFnsOptions,
  defaultOperatorOptions
};
