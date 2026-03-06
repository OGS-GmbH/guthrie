import  {type ElementType} from "react";
import {DEFAULT_COMPONENTS, FLOW_CONTROL_COMPONENTS, HTML_COMPONENTS} from "./constants";

type EquipmentOptions = {
  withIntrinsics?: boolean;
  withFlowControl?: boolean;
  elementMapping?: (value: string) => string };

const DEFAULT_OPTIONS: EquipmentOptions = {
  withIntrinsics: true,
  withFlowControl: true
}

function withGuthriesEquipment({components, options}: {components?: Record<string, ElementType>, options?: EquipmentOptions}): Record<string, ElementType> {
  if (!components && !options)
    return {...DEFAULT_COMPONENTS};

  const userComponents: Record<string, ElementType> = components ?? {};
  const userOptions = {...DEFAULT_OPTIONS, ...options}

  let componentSet: Record<string, ElementType> = {};

  if (userOptions.withIntrinsics)
    componentSet = {...HTML_COMPONENTS};

  if(userOptions.withFlowControl)
    componentSet = {...componentSet, ...FLOW_CONTROL_COMPONENTS}

  componentSet = {...componentSet, ...userComponents};

  const entries = Object.entries(componentSet);

  if (!userOptions.elementMapping)
    return componentSet;

  return Object.fromEntries(
    entries.map(([key, value])=> [userOptions.elementMapping!(key), value])
  );
}

export {withGuthriesEquipment}

export type {EquipmentOptions}
