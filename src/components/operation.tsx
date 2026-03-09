type MathOperationNames = "add" | "sub" | "mul" | "div" | "exp" | "mod" | "inc" | "dec" | "gt" | "lt" | "eq" | "neq" | "and" | "or" | "not" | "gte" | "lte" | "bor" | "band" | "bxor" | "bnot";

type MathOperationResult = number | boolean;

type MathOperand = number | boolean | MathOperation;

type MathOperation = {
  name: MathOperationNames,
  args: MathOperand[]
}

type OperationProps = {
  operation: MathOperation
}

function getOperand (arg: number | boolean | MathOperation): number | boolean {
  return typeof arg === "number" || typeof arg === "boolean"
    ? arg
    : evaluateMathOperation(arg);
}

function handleAddition ({args}: MathOperation): MathOperationResult {
  let result = 0;

  for (const arg of args) {
    const argOperand = getOperand(arg);

    result += Number(argOperand);
  }

  return result;
}

function handleSubstraction ({args}: MathOperation): MathOperationResult {
  let result: number = Number(getOperand(args.at(0)!));

  for (const arg of args.slice(1)) {
    const argOperand = getOperand(arg);

    result -= Number(argOperand);
  }

  return result;
}

function handleMultiplication ({args}: MathOperation): MathOperationResult {
  let result = 1;

  for (const arg of args) {
    result *= Number(getOperand(arg));
  }

  return result;
}

function handleDivision ({args}: MathOperation): MathOperationResult {
  let result: number = Number(getOperand(args.at(0)!));

  for (const arg of args.slice(1)) {
    result /= Number(getOperand(arg));
  }

  return result;
}

function handleExponentation ({args}: MathOperation): MathOperationResult {
  let result: number = Number(getOperand(args.at(0)!));

  for (const arg of args.slice(1)) {
    result **= Number(getOperand(arg));
  }

  return result;
}

function handleModulus ({args}: MathOperation): MathOperationResult {
  let result: number = Number(getOperand(args.at(0)!));

  for (const arg of args.slice(1)) {
    result %= Number(getOperand(arg));
  }

  return result;
}

function handleIncrement ({args}: MathOperation): MathOperationResult {
  let result: number = Number(getOperand(args.at(0)!));

  return result + 1;
}

function handleDecrement ({args}: MathOperation): MathOperationResult {
  let result: number = Number(getOperand(args.at(0)!));

  return result - 1;
}

function handleGreaterThan ({args}: MathOperation): MathOperationResult {
  let result: boolean = false;
  let previousOperand: number | boolean = getOperand(args.at(0)!);
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    if (i !== 0 && !result) {
      break;
    }

    const currentOperand = getOperand(args.slice(1)[i]);

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = Number(previousOperand) > Number(currentOperand);
      continue;
    }

    result &&= Number(previousOperand) > Number(currentOperand);
  }

  return result;
}

function handleLessThan ({args}: MathOperation): MathOperationResult {
  return Number(getOperand(args.at(0)!)) < Number(getOperand(args.at(1)!));
}

function handleEqual ({args}: MathOperation): MathOperationResult {
  return Number(getOperand(args.at(0)!)) === Number(getOperand(args.at(1)!));
}

function handleNotEqual ({args}: MathOperation): MathOperationResult {
  return Number(getOperand(args.at(0)!)) !== Number(getOperand(args.at(1)!));
}

function handleAnd ({args}: MathOperation): MathOperationResult {
  return Number(getOperand(args.at(0)!)) && Number(getOperand(args.at(1)!));
}

function handleOr ({args}: MathOperation): MathOperationResult {
  return Number(getOperand(args.at(0)!)) || Number(getOperand(args.at(1)!));
}

function evaluateMathOperation(mathOperation: MathOperation): number | boolean {
  switch (mathOperation.name) {
    case "add": {
      return handleAdd(mathOperation);
    }

    case "sub": {
      break;
    }
  }
}

function Operation ({ operation }: OperationProps) {
  const result = 
}
