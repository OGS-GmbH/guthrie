import { ContentRenderer, type ElementProps } from "../stage";

type Condition = {
  condition: boolean,
  children: ElementProps[]
};

type ConditionalProps = {
  _if: Condition,
  _elseIf?: Condition[],
  _else?: {
    children: ElementProps[]
  }
};

function Conditional({_if, _elseIf, _else}: ConditionalProps) {
  if (_if.condition) {
    return _if.children.map((child, index) => (
      <ContentRenderer key={index} elementProps={child} />
    ))
  }

  if (_elseIf) {
    for (const condition of _elseIf) {
      if (!condition.condition)
        continue;

      return condition.children.map((child, index) => (
        <ContentRenderer key={index} elementProps={child} />
      ))
    }
  }
  
  return _else?.children.map((child, index) => (
    <ContentRenderer key={index} elementProps={child} />
  ))
}

export {Conditional}
