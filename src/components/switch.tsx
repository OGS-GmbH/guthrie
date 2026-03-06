import { useMemo } from "react"
import { type DynamicElementProps } from "../renderer/type"
import { Renderer } from "../renderer/renderer";

type InnerCase = {
  children: DynamicElementProps[]
};

type Case = Record<string | number, InnerCase>;

type SwitchProps = {
  condition: string | number,
  cases: Case,
  _default: InnerCase
};

function Switch ({condition, _default, cases}: SwitchProps) {
  const currentCase = useMemo(() => cases[condition] ?? _default, [cases, condition]);
  
  return currentCase.children.map((child, index) => (
    <Renderer key={index} {...child} />
  ))
}

export {
  Switch
}
