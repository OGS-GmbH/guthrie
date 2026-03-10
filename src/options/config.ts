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

function withElements ({elements, options}: Partial<{
  elements: Elements,
  options: Partial<WithElementsOptions>
}>): Elements {
  const configuredIntrinsics = (options?.intrinsics ?? defaultElementOptions.intrinsics)
    ? intrinsics
    : {};
  const configuredFlowControls = (options?.flowControls ?? defaultElementOptions.flowControls)
    ? flowControls
    : {};
  const configuredAdditional = (options?.additional ?? defaultElementOptions.additional)
    ? additional
    : {};

  const elementsResult: Elements = {
    ...elements,
    ...configuredIntrinsics,
    ...configuredAdditional,
    ...configuredFlowControls
  };

  return Object.fromEntries(
    Object.entries(elementsResult).map(([key, value]) => [
      options?.mapNames ? options.mapNames(key) : key,
      value
    ])
  )
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
