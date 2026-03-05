import { useMemo } from "react"
import { ContentRenderer, type ElementProps } from "../stage"

type InnerCase = {
  children: ElementProps[]
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
    <ContentRenderer key={index} elementProps={child} />
  ))
}

export {
  Switch
}
