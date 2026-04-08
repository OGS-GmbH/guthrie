import { solveOperation } from "../renderer/operations.js";
import { Renderer } from "../renderer/renderer.js";
import {
  type ContextProps,
  type DynamicElementProps,
  type OperationDefinition,
  type Operators
} from "../renderer/type.js";
import { useGuthrieOperators } from "../stores/operators.js";
import { useGuthrieVariables } from "../stores/variables.js";

/**
 * Represents all possible values that can be used in a condition.
 *
 * - boolean: evaluated directly
 * - number: converted to truthy/falsy
 * - string: treated as a variable name
 * - Operation: evaluated dynamically
 *
 * @since 1.0.0
 * @category Components
 */
type ConditionValue = boolean | number | string | OperationDefinition;

/**
 * Defines a single conditional branch with its associated children.
 *
 * @since 1.0.0
 * @category Components
 */
type Condition = {
  /** Expression that will be evaluated */
  condition: ConditionValue;

  /** Elements to render if the condition is truthy */
  children: DynamicElementProps[];
};

/**
 * Props for the {@link Conditional} component.
 *
 * @since 1.0.0
 * @category Components
 */
type ConditionalProps = ContextProps & {
  /** Primary condition (equivalent to "if") */
  if: Condition;

  /** Optional additional conditions (equivalent to "else if") */
  elseIf?: Condition[];

  /** Fallback branch if no condition matches */
  else?: {
    children: DynamicElementProps[];
  };
};

/**
 * Evaluates a condition and returns a boolean result.
 *
 * @param condition - The condition to evaluate
 * @param operators - Available operators for resolving operations
 * @param variables - Current variable state
 * @returns `true` if the condition is satisfied, otherwise `false`
 *
 * @remarks
 * Behavior depends on the type of `condition`:
 * - boolean → returned as-is
 * - number → converted using truthy/falsy rules
 * - string → resolved as a variable key
 * - Operation → evaluated via {@link solveOperation}
 *
 * @since 1.0.0
 * @category Utilities
 */
function solveCondition(
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

/**
 * Conditionally renders dynamic elements based on evaluated conditions
 * (similar to `if / else if / else` logic).
 *
 * @param props - Configuration of conditions and corresponding elements
 * @returns A list of rendered React elements or `undefined`
 *
 * @remarks
 * Evaluation order:
 * 1. `if`
 * 2. `elseIf` (in order)
 * 3. `else`
 *
 * Only the first matching branch will be rendered.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
function Conditional(props: ConditionalProps) {
  const operators = useGuthrieOperators((state) => state.operators);
  const variables = useGuthrieVariables((state) => state.variables);

  if (solveCondition(props["if"].condition, operators, variables))
    return props["if"].children.map((child, index) => <Renderer key={index} {...child} />);

  if (props["elseIf"]) {
    for (const condition of props["elseIf"]) {
      if (!solveCondition(condition.condition, operators, variables)) continue;

      return condition.children.map((child, index) => <Renderer key={index} {...child} />);
    }
  }

  return props["else"]?.children.map((child, index) => <Renderer key={index} {...child} />);
}

export type { ConditionValue, Condition, ConditionalProps };
export { Conditional, solveCondition };
