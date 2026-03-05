import  {type ElementType} from "react";
import {DEFAULT_COMPONENTS, FLOW_CONTROL_COMPONENTS, HTML_COMPONENTS} from "./constants";

type EquipmentOptions = {
  withIntrinsics?: boolean,
  withFlowControl?: boolean,
  elementMapping?: (value: string) => string };

const DEFAULT_OPTIONS: EquipmentOptions = {
  withIntrinsics: true,
  withFlowControl: true
}
/*TODO: das gedefaulte gefällt mir noch nicht so*/

function withGuthriesEquipment({components, options}: {components?: Record<string, ElementType>, options?: EquipmentOptions}): Record<string, ElementType> {
  const _components = components ?? DEFAULT_COMPONENTS;
  const _options = options ?? DEFAULT_OPTIONS

  _options.withIntrinsics = _options.withIntrinsics ?? true;
  _options.withFlowControl = _options.withFlowControl ?? true;

  let componentSet = {};

  if (_options.withIntrinsics )
    componentSet = HTML_COMPONENTS;

  if(_options.withFlowControl)
    componentSet = {...componentSet, ...FLOW_CONTROL_COMPONENTS}

  componentSet = {..._components, ...componentSet};

  if (!_options.elementMapping)
    return componentSet;

  return Object.fromEntries(
    Object.entries(_components).map(([key, value])=> [_options.elementMapping!(key), value])
  );
}

export {withGuthriesEquipment}

export type {EquipmentOptions}
