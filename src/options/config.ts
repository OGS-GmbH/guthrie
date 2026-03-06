import type { Elements } from "../renderer/type";
import { flowControls, intrinsics } from "./elements";

type WithElementsOptions = Partial<{
  intrinsics: boolean,
  flowControls: boolean,
  elementMapping: (value: string) => string
}>;

const defaults: WithElementsOptions = {
  intrinsics: true,
  flowControls: true
}

function withElements ({elements, options}: Partial<{
  elements: Elements,
  options: Partial<WithElementsOptions>
}>): Elements {
  const configuredIntrinsics = (options?.intrinsics ?? defaults.intrinsics)
    ? intrinsics
    : {};
  const configuredFlowControls = (options?.flowControls ?? defaults.flowControls)
    ? flowControls
    : {};

  const elementsResult: Elements = {
    ...elements,
    ...configuredIntrinsics,
    ...configuredFlowControls
  };

  return Object.fromEntries(
    Object.entries(elementsResult).map(([key, value]) => [
      options?.elementMapping ? options.elementMapping(key) : key,
      value
    ])
  )
}

export type {
  WithElementsOptions
}

export {
  withElements
}
