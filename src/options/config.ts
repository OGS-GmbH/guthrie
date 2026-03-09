import type { Elements, Fns } from "../renderer/type";
import { flowControls, intrinsics } from "./elements";
import { native } from "./fns";

type WithElementsOptions = Partial<{
  intrinsics: boolean,
  flowControls: boolean,
  mapNames: (value: string) => string
}>;

const defaultElementOptions: WithElementsOptions = {
  intrinsics: true,
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

  const elementsResult: Elements = {
    ...elements,
    ...configuredIntrinsics,
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

export type {
  WithElementsOptions,
  WithFnsOptions
}

export {
  withElements,
  withFns
}
