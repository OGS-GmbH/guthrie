import type { OperatorFn, OperatorReturn, Operators, PrimitiveOperatorArg } from "../renderer/type";

const addition: OperatorFn = function (...args): OperatorReturn {
  let result = 0;

  for (const arg of args)
    result += Number(arg);

  return result;
}

const substraction: OperatorFn = function (...args): OperatorReturn {
  let result: number = Number(args.at(0)!);

  for (const arg of args.slice(1))
    result -= Number(arg);

  return result;
}

const multiplication: OperatorFn = function (...args): OperatorReturn {
  let result = 1;

  for (const arg of args)
    result *= Number(arg);

  return result;
}

const division: OperatorFn = function (...args): OperatorReturn {
  let result: number = Number(args.at(0)!);

  for (const arg of args.slice(1))
    result /= Number(arg);

  return result;
}

const exponentation: OperatorFn = function (...args): OperatorReturn {
  let result: number = Number(args.at(0)!);

  for (const arg of args.slice(1))
    result **= Number(arg);

  return result;
}

const modulus: OperatorFn = function (...args): OperatorReturn {
  let result: number = Number(args.at(0)!);

  for (const arg of args.slice(1))
    result %= Number(arg);

  return result;
}

const increment: OperatorFn = function (...args): OperatorReturn {
  return Number(args.at(0)!) + 1;
}

const decrement: OperatorFn = function (...args): OperatorReturn {
  return Number(args.at(0)!) - 1;
}

const greaterThan: OperatorFn = function (...args): OperatorReturn {
  let result: boolean = false;
  let previousOperand = args.at(0)!;
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    const currentOperand = remainingArgs[i];

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = Number(previousOperand) > Number(currentOperand);
      continue;
    }

    result &&= Number(previousOperand) > Number(currentOperand);

    if (!result)
      break;
  }

  return result;
}

const lessThan: OperatorFn = function (...args): OperatorReturn {
  let result: boolean = false;
  let previousOperand: PrimitiveOperatorArg = args.at(0)!;
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    const currentOperand = remainingArgs[i];

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = Number(previousOperand) < Number(currentOperand);
      continue;
    }

    result &&= Number(previousOperand) < Number(currentOperand);
    if (!result)
      break;
  }

  return result;
}

const equal: OperatorFn = function (...args): OperatorReturn {
  let result: boolean = false;
  let previousOperand = args.at(0)!;
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    const currentOperand = remainingArgs[i];

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = Number(previousOperand) === Number(currentOperand);
      continue;
    }

    result &&= Number(previousOperand) === Number(currentOperand);
    if (!result)
      break;
  }

  return result;
}

const notEqual: OperatorFn = function (...args): OperatorReturn {
  let result: boolean = false;
  let previousOperand = args.at(0)!;
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    const currentOperand = remainingArgs[i];

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = Number(previousOperand) !== Number(currentOperand);
      continue;
    }

    result &&= Number(previousOperand) !== Number(currentOperand);

    if (!result)
      break;
  }

  return result;
}

const and: OperatorFn = function (...args): OperatorReturn {
  let result: boolean = false;
  let previousOperand = args.at(0)!;
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    const currentOperand = remainingArgs[i];

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = Boolean(previousOperand) && Boolean(currentOperand);
      continue;
    }

    result &&= Boolean(previousOperand) && Boolean(currentOperand);

    if (!result)
      break;
  }

  return result;
}

const or: OperatorFn = function (...args): OperatorReturn {
  let result: boolean = false;
  let previousOperand = args.at(0)!;
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    const currentOperand = remainingArgs[i];

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = Boolean(previousOperand) || Boolean(currentOperand);
      continue;
    }

    result &&= Boolean(previousOperand) || Boolean(currentOperand);

    if (!result)
      break;
  }

  return result;
}

const not: OperatorFn = function (...args): OperatorReturn {
  let result = false;

  for (let i = 0; i < args.length; i++) {
    const currentOperand = Boolean(args.at(i)!);

    if (i === 0) {
      result = !currentOperand;
      continue;
    }

    result &&= !currentOperand;

    if (!result)
      break;
  }

  return result;
}

const greaterThanOrEqual: OperatorFn = function (...args): OperatorReturn {
  let result: boolean = false;
  let previousOperand = args.at(0)!;
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    const currentOperand = remainingArgs[i];

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = Number(previousOperand) >= Number(currentOperand);
      continue;
    }

    result &&= Number(previousOperand) >= Number(currentOperand);

    if (!result)
      break;
  }

  return result;
}

const lessThanOrEqual: OperatorFn = function (...args): OperatorReturn {
  let result: boolean = false;
  let previousOperand = args.at(0)!;
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    const currentOperand = remainingArgs[i];

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = Number(previousOperand) <= Number(currentOperand);
      previousOperand = currentOperand;
      continue;
    }

    result &&= Number(previousOperand) <= Number(currentOperand);
    previousOperand = currentOperand;

    if (!result)
      break;
  }

  return result;
}

const bitwiseOr: OperatorFn = function (...args): OperatorReturn {
  let result: number = 0;
  let previousOperand = args.at(0)!;
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    const currentOperand = remainingArgs[i];

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = Number(previousOperand) | Number(currentOperand);
      previousOperand = currentOperand;
      continue;
    }

    result = result | Number(previousOperand) | Number(currentOperand);
    previousOperand = currentOperand;
  }

  return result;
}

const bitwiseAnd: OperatorFn = function (...args): OperatorReturn{
  let result: number = 0;
  let previousOperand = args.at(0)!;
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    const currentOperand = remainingArgs[i];

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = Number(previousOperand) & Number(currentOperand);
      previousOperand = currentOperand;
      continue;
    }

    result = result & Number(previousOperand) & Number(currentOperand);
    previousOperand = currentOperand;
  }

  return result;
}

const bitwiseXor: OperatorFn = function (...args): OperatorReturn {
  let result: number = 0;
  let previousOperand = args.at(0)!;
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    const currentOperand = remainingArgs[i];

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = Number(previousOperand) ^ Number(currentOperand);
      previousOperand = currentOperand;
      continue;
    }

    result = result & Number(previousOperand) ^ Number(currentOperand);
    previousOperand = currentOperand;
  }

  return result;
}

const bitwiseNot: OperatorFn = function (...args): OperatorReturn {
  let result: number = 0;
  let previousOperand = args.at(0)!;
  const remainingArgs = args.slice(1);

  for (let i = 0; i < remainingArgs.length; i++) {
    const currentOperand = remainingArgs[i];

    // Skip first result evalulation, since we need to compare the first operand with the second one first
    if (i === 0) {
      result = ~Number(previousOperand) + ~Number(currentOperand);
      previousOperand = currentOperand;
      continue;
    }

    result = result + ~Number(previousOperand) + ~Number(currentOperand);
    previousOperand = currentOperand;
  }

  return result;
}

const bitwiseLeftShift: OperatorFn = function (...args): OperatorReturn {
  return Number(args.at(0)!) << Number(args.at(1)!);
}

const bitwiseRightShift: OperatorFn = function (...args): OperatorReturn {
  return Number(args.at(0)!) >> Number(args.at(1)!);
}

const bitwiseRightShiftZero: OperatorFn = function (...args): OperatorReturn {
  return Number(args.at(0)!) >>> Number(args.at(1)!);
}

const universal: Operators = {
  addition,
  substraction,
  multiplication,
  division,
  exponentation,
  modulus,

  increment,
  decrement,

  greaterThan,
  lessThan,
  greaterThanOrEqual,
  lessThanOrEqual,
  equal,
  notEqual,

  and,
  or,
  not,

  bitwiseOr,
  bitwiseAnd,
  bitwiseXor,
  bitwiseNot,
  bitwiseLeftShift,
  bitwiseRightShift,
  bitwiseRightShiftZero
}

const universalShort = {
  add: addition,
  sub: substraction,
  mul: multiplication,
  div: division,
  exp: exponentation,
  mod: modulus,

  inc: increment,
  dec: decrement,

  gt: greaterThan,
  lt: lessThan,
  gte: greaterThanOrEqual,
  lte: lessThanOrEqual,
  eq: equal,
  neq: notEqual,

  and: and,
  or: or,
  not: not,

  bor: bitwiseOr,
  band: bitwiseAnd,
  bxor: bitwiseXor,
  bnot: bitwiseNot,
  shl: bitwiseLeftShift,
  shr: bitwiseRightShift,
  ushr: bitwiseRightShiftZero
}

export {
  addition,
  substraction,
  multiplication,
  division,
  exponentation,
  modulus,
  increment,
  decrement,
  greaterThan,
  lessThan,
  equal,
  notEqual,
  and,
  or,
  not,
  greaterThanOrEqual,
  lessThanOrEqual,
  bitwiseOr,
  bitwiseAnd,
  bitwiseXor,
  bitwiseNot,
  bitwiseLeftShift,
  bitwiseRightShift,
  bitwiseRightShiftZero,
  universal,
  universalShort
}
