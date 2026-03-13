import { useMemo } from "react"
import { type DynamicElementProps } from "../renderer/type"
import { Renderer } from "../renderer/renderer";
import { useGuthrieVariables } from "../stores/variables";

type InnerCase = {
  children: DynamicElementProps[]
};

type Case = Record<string | number, InnerCase>;

type SwitchProps = {
  // Condition can only be a variable (= string)
  condition: string,
  cases: Case,
  default: InnerCase
};

function Switch ({condition, cases, ...props}: SwitchProps) {
  const variable = useGuthrieVariables((state) => state.variables[condition]);
  const currentCase = useMemo(
    () => cases[variable as string] ?? props["default"],
    [cases, variable]
  );
  
  return currentCase.children.map((child, index) => (
    <Renderer key={index} {...child} />
  ))
}

export {
  Switch
}
