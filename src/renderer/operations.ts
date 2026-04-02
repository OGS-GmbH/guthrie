import type { OperationDefinition as _Operation, OperatorArg, OperatorFn, OperatorReturn, Operators, PrimitiveOperatorArg } from "./type";

/**
 * Resolves an operator argument into a primitive value.
 *
 * This function evaluates the given argument based on its type:
 * - primitive → returned directly
 * - string → resolved as a variable reference
 * - operation → recursively evaluated via {@link solveOperation}
 *
 * @param operators - Available operators
 * @param arg - Argument to resolve
 * @param variables - Current variable state
 *
 * @returns Resolved primitive value
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
function getOperand (
  operators: Operators,
  arg: OperatorArg,
  variables: Record<string, unknown>
): PrimitiveOperatorArg {
  if (typeof arg === "number" || typeof arg === "boolean")
    return arg;

  if (typeof arg === "string")
    return variables[arg] as PrimitiveOperatorArg;

  return solveOperation(operators, arg, variables); // oxlint-disable-line eslint(no-use-before-define)
}

/**
 * Evaluates an operation using the provided operators and variables.
 *
 * This function resolves all arguments of the operation and executes
 * the corresponding operator function.
 *
 * @remarks
 * - Arguments are resolved via {@link getOperand}
 * - Supports nested operations (recursive evaluation)
 *
 * @param operators - Available operator functions
 * @param operation - Operation to evaluate
 * @param variables - Current variable state
 *
 * @returns Result of the evaluated operation
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
function solveOperation (
  operators: Operators,
  operation: _Operation,
  variables: Record<string, unknown>
): OperatorReturn {
  const operatorFn: OperatorFn = operators[operation.name]!;

  return operatorFn(...operation.args.map((operatorArg: OperatorArg) => getOperand(operators, operatorArg, variables)));
}

export {
  getOperand,
  solveOperation
}
