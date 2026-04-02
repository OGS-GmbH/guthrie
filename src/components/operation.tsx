import { useMemo } from "react";
import type { OperationDefinition as _Operation } from "../renderer/type";
import { useGuthrieOperators } from "../stores/operators";
import { useGuthrieVariables } from "../stores/variables";
import { solveOperation } from "../renderer/operations";

/**
 * Props for the {@link Operation} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type OperationProps = {
  operation: _Operation
}

/**
 * Evaluates an operation and returns its result.
 *
 * This component resolves the provided operation via {@link solveOperation} using the current
 * operators and variables from the Guthrie context.
 *
 * @remarks
 * - Returns the computed result directly
 * - Does not render DOM elements
 *
 * @returns React Component
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
function Operation ({ operation }: OperationProps) {
  const operators = useGuthrieOperators((state) => state.operators);
  const variables = useGuthrieVariables((state) => state.variables);
  const result = useMemo(
    () => operation === undefined
      ? undefined
      : solveOperation(operators, operation, variables),
    [operation, operators, variables]
  );

  return result;
}

export type {
  OperationProps
}

export {
  Operation
}
