import { ElementType } from "react";
import type { Elements, Fns, Operators } from "../renderer/type";
import { additional, flowControls, intrinsics } from "./elements";
import { native } from "./fns";
import { universal, universalShort } from "./operations";

type WithElementsOptions = Partial<{
  intrinsics: boolean,
  additional: boolean,
  flowControls: boolean,
  mapNames: (value: string) => string
}>;

const defaultElementOptions: WithElementsOptions = {
  intrinsics: true,
  additional: true,
  flowControls: true
}

function withElements (config?: Partial<{
  elements: Elements,
  options: WithElementsOptions
}>): Elements {
  let currentElements: Elements = {};

  if (config?.elements !== undefined) {
    if (config.options?.mapNames === undefined)
      currentElements = config.elements;
    else {
      for (const key in config.elements) {
        const currentKey = config.options?.mapNames
          ? config.options.mapNames(key)
          : key;

        currentElements[currentKey] = config.elements[key] as ElementType;
      }
    }
  }


  const configuredIntrinsics = (config?.options?.intrinsics ?? defaultElementOptions.intrinsics)
    ? intrinsics
    : {};

  for (const key in configuredIntrinsics) {
    const currentKey = config?.options?.mapNames
      ? config.options.mapNames(key)
      : key;

    currentElements[currentKey] = configuredIntrinsics[key] as ElementType;
  }

  const configuredFlowControls = (config?.options?.flowControls ?? defaultElementOptions.flowControls)
    ? flowControls
    : {};

  for (const key in configuredFlowControls) {
    const currentKey = config?.options?.mapNames
      ? config.options.mapNames(key)
      : key;

    currentElements[currentKey] = configuredFlowControls[key] as ElementType;
  }

  const configuredAdditional = (config?.options?.additional ?? defaultElementOptions.additional)
    ? additional
    : {};

  for (const key in configuredAdditional) {
    const currentKey = config?.options?.mapNames
      ? config.options.mapNames(key)
      : key;

    currentElements[currentKey] = configuredAdditional[key] as ElementType;
  }

  return currentElements;
}

type WithFnsOptions = Partial<{
  native: boolean,
  mapNames: (value: string) => string
}>;

const defaultFnsOptions: WithFnsOptions = {
  native: true
}

function withFns ({fns, options}: Partial<{
  fns: Fns,
  options: WithFnsOptions
}>): Fns {
  const configuredNatives = (options?.native ?? defaultFnsOptions.native)
    ? native
    : {};

  const fnsResult: Fns = {
    ...fns,
    ...configuredNatives
  }

  return Object.fromEntries(
    Object.entries(fnsResult).map(([key, value]) => [
      options?.mapNames ? options?.mapNames(key) : key,
      value
    ])
  )
}

type WithOperatorOptions = Partial<{
  universal: boolean,
  /*
   * Universal = long names
   * Guthrie recommends short names
   */
  universalNames: "universal" | "guthrie",
  mapNames: (value: string) => string
}>;

const defaultOperatorOptions: WithOperatorOptions = {
  universal: true
}

function withOperators ({operators, options}: Partial<{
  operators: Operators,
  options: WithOperatorOptions
}>) {
  const configuredUniversal = (options?.universal ?? defaultOperatorOptions.universal)
    ? options?.universalNames === "universal"
      ? universal
      : universalShort
    : {};

  return {
    ...configuredUniversal,
    ...operators
  }
}

export type {
  WithElementsOptions,
  WithFnsOptions,
  WithOperatorOptions
}

export {
  withElements,
  withFns,
  withOperators
}
