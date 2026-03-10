import { useMemo } from "react";
import type { Operation as _Operation, OperatorArg, OperatorFn, OperatorReturn, Operators, PrimitiveOperatorArg } from "../renderer/type";
import { useGuthrieOperators } from "../stores/operators";
import { useGuthrieVariables } from "../stores/variables";

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

type OperationProps = {
  operation: _Operation
}

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

export {
  getOperand,
  solveOperation,
  Operation
}
