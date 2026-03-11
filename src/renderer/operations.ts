import type { Operation as _Operation, OperatorArg, OperatorFn, OperatorReturn, Operators, PrimitiveOperatorArg } from "./type";

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
