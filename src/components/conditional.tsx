import { type DynamicElementProps, type Operation, type Operators } from "../renderer/type";
import { Renderer } from "../renderer/renderer";
import { useGuthrieOperators } from "../stores/operators";
import { useGuthrieVariables } from "../stores/variables";
import { solveOperation } from "../renderer/operations";

type ConditionValue = boolean | number | string | Operation;

type Condition = {
  condition: ConditionValue,
  children: DynamicElementProps[]
};

type ConditionalProps = {
  _if: Condition,
  _elseIf?: Condition[],
  _else?: {
    children: DynamicElementProps[]
  }
};

function solveCondition (
  condition: ConditionValue,
  operators: Operators,
  variables: Record<string, unknown>
): boolean {
  switch (typeof condition) {
    case "boolean": {
      return condition;
    }

    case "number": {
      return Boolean(condition);
    }

    case "string": {
      const variableValue = variables[condition];
      return Boolean(variableValue);
    }

    default: {
      break;
    }
  }

  return Boolean(solveOperation(operators, condition, variables));
}

function Conditional({_if, _elseIf, _else}: ConditionalProps) {
  const operators = useGuthrieOperators((state) => state.operators);
  const variables = useGuthrieVariables((state) => state.variables);

  if (solveCondition(_if.condition, operators, variables)) {
    return _if.children.map((child, index) => (
      <Renderer key={index} {...child} />
    ))
  }

  if (_elseIf) {
    for (const condition of _elseIf) {
      if (!solveCondition(condition.condition, operators, variables))
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
