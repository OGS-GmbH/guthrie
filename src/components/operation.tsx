import { useMemo } from "react";
import type { Operation as _Operation } from "../renderer/type";
import { useGuthrieOperators } from "../stores/operators";
import { useGuthrieVariables } from "../stores/variables";
import { solveOperation } from "../renderer/operations";

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
  Operation
}
