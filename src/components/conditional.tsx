import { type ContextProps, type DynamicElementProps, type Operation, type Operators } from "../renderer/type";
import { Renderer } from "../renderer/renderer";
import { useGuthrieOperators } from "../stores/operators";
import { useGuthrieVariables } from "../stores/variables";
import { solveOperation } from "../renderer/operations";

type ConditionValue = boolean | number | string | Operation;

type Condition = {
  condition: ConditionValue,
  children: DynamicElementProps[]
};

type ConditionalProps = ContextProps & {
  if: Condition,
  elseIf?: Condition[],
  else?: {
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

function Conditional(props: ConditionalProps) {
  const operators = useGuthrieOperators((state) => state.operators);
  const variables = useGuthrieVariables((state) => state.variables);

  if (solveCondition(props["if"].condition, operators, variables)) {
    return props["if"].children.map((child, index) => (
      <Renderer key={index} {...child} />
    ))
  }

  if (props["elseIf"]) {
    for (const condition of props["elseIf"]) {
      if (!solveCondition(condition.condition, operators, variables))
        continue;

      return condition.children.map((child, index) => (
        <Renderer key={index} {...child} />
      ))
    }
  }
  
  return props["else"]?.children.map((child, index) => (
    <Renderer key={index} {...child} />
  ))
}

export {Conditional}
