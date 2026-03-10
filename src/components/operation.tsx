import { useMemo } from "react";
import type { Operation as _Operation, OperatorArg, OperatorFn, OperatorReturn, Operators, PrimitiveOperatorArg } from "../renderer/type";
import { useGuthrieOperators } from "../stores/operators";

function getOperand (operators: Operators, arg: OperatorArg): PrimitiveOperatorArg {
  return typeof arg === "number" || typeof arg === "boolean" || typeof arg === "string"
    ? arg
    : solveOperation(operators, arg); // oxlint-disable-line eslint(no-use-before-define)
}

function solveOperation (operators: Operators, operation: _Operation): OperatorReturn {
  const operatorFn: OperatorFn = operators[operation.name]!;

  return operatorFn(...operation.args.map((operatorArg: OperatorArg) => getOperand(operators, operatorArg)));
}

type OperationProps = {
  operation: _Operation
}

function Operation ({ operation }: OperationProps) {
  const operators = useGuthrieOperators((state) => state.operators);
  const result = useMemo(
    () => operation === undefined
      ? undefined
      : solveOperation(operators, operation),
    [operation, operators]
  );

  return result;
}

export {
  getOperand,
  solveOperation,
  Operation
}
