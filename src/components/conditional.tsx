import { type DynamicElementProps } from "../renderer/type";
import { Renderer } from "../renderer/renderer";

type Condition = {
  condition: boolean,
  children: DynamicElementProps[]
};

type ConditionalProps = {
  _if: Condition,
  _elseIf?: Condition[],
  _else?: {
    children: DynamicElementProps[]
  }
};

function Conditional({_if, _elseIf, _else}: ConditionalProps) {
  if (_if.condition) {
    return _if.children.map((child, index) => (
      <Renderer key={index} {...child} />
    ))
  }

  if (_elseIf) {
    for (const condition of _elseIf) {
      if (!condition.condition)
        continue;

      return condition.children.map((child, index) => (
        <Renderer key={index} {...child} />
      ))
    }
  }
  
  return _else?.children.map((child, index) => (
    <Renderer key={index} {...child} />
  ))
}

export {Conditional}
