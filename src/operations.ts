import type { OperatorFn, OperatorReturn } from "./renderer/type";

/**
 * Adds all arguments.
 *
 * @returns Sum of all arguments
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const addition: OperatorFn = function (...args): OperatorReturn {
  let result = 0;

  for (const arg of args) result += Number(arg);

  return result;
};

/**
 * Subtracts all arguments.
 *
 * @param args - Numeric arguments
 *
 * @returns Difference of all arguments
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const substraction: OperatorFn = function (...args): OperatorReturn {
  let result: number = Number(args.at(0)!);

  for (const arg of args.slice(1)) result -= Number(arg);

  return result;
};

/**
 * Multiplies all arguments.
 *
 * @param args - Numeric arguments
 *
 * @returns Product of all arguments
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const multiplication: OperatorFn = function (...args): OperatorReturn {
  let result = 1;

  for (const arg of args) result *= Number(arg);

  return result;
};

/**
 * Divides all arguments.
 *
 * @param args - Numeric arguments
 *
 * @returns Quotient of all arguments
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const division: OperatorFn = function (...args): OperatorReturn {
  let result: number = Number(args.at(0)!);

  for (const arg of args.slice(1)) result /= Number(arg);

  return result;
};

/**
 * Raises the first argument to the power of the subsequent arguments.
 *
 * @remarks
 * Applies exponentiation sequentially:
 * `a ** b ** c` is evaluated as `(a ** b) ** c`
 *
 * @param args - Numeric arguments (base followed by exponent(s))
 *
 * @returns Result of the exponentiation chain
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const exponentation: OperatorFn = function (...args): OperatorReturn {
  let result: number = Number(args.at(0)!);

  for (const arg of args) result **= Number(arg);

  return result;
};

/**
 * Applies the modulus operation sequentially across all arguments.
 *
 * @remarks
 * Evaluated from left to right:
 * `a % b % c` is evaluated as `(a % b) % c`
 *
 * @param args - Numeric arguments
 *
 * @returns Result of the modulus chain
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const modulus: OperatorFn = function (...args): OperatorReturn {
  let result: number = Number(args.at(0)!);

  for (const arg of args) result %= Number(arg);

  return result;
};

/**
 * Increments the first argument by 1.
 *
 * @remarks
 * Only the first argument is used. Additional arguments are ignored.
 *
 * @param args - Numeric arguments
 *
 * @returns First argument incremented by 1
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const increment: OperatorFn = function (...args): OperatorReturn {
  return Number(args.at(0)!) + 1;
};

/**
 * Decrements the first argument by 1.
 *
 * @remarks
 * Only the first argument is used. Additional arguments are ignored.
 *
 * @param args - Numeric arguments
 *
 * @returns First argument decremented by 1
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const decrement: OperatorFn = function (...args): OperatorReturn {
  return Number(args.at(0)!) - 1;
};

/**
 * Checks if each argument is greater than the next.
 *
 * @remarks
 * Evaluated sequentially:
 * `a > b > c` is evaluated as `(a > b) && (b > c)`
 *
 * @param args - Numeric arguments
 *
 * @returns `true` if all comparisons are satisfied, otherwise `false`
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const greaterThan: OperatorFn = function (...args): OperatorReturn {
  for (let i = 0; i < args.length - 1; i++)
    if (!(Number(args[i]) > Number(args[i + 1]))) return false;

  return true;
};

/**
 * Checks if each argument is greater than or equal to the next.
 *
 * @remarks
 * Evaluated sequentially:
 * `a > b > c` is evaluated as `(a > b) && (b > c)`
 *
 * @param args - Numeric arguments
 *
 * @returns `true` if all comparisons are satisfied, otherwise `false`
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const greaterThanOrEqual: OperatorFn = function (...args): OperatorReturn {
  for (let i = 0; i < args.length - 1; i++)
    if (Number(args[i]) <= Number(args[i + 1])) return false;

  return true;
};

/**
 * Checks if each argument is less than the next.
 *
 * @remarks
 * Evaluated sequentially:
 * `a < b < c` is evaluated as `(a < b) && (b < c)`
 *
 * @param args - Numeric arguments
 *
 * @returns `true` if all comparisons are satisfied, otherwise `false`
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const lessThan: OperatorFn = function (...args): OperatorReturn {
  for (let i = 0; i < args.length - 1; i++)
    if (!(Number(args[i]) < Number(args[i + 1]))) return false;

  return true;
};

const lessThanOrEqual: OperatorFn = function (...args): OperatorReturn {
  for (let i = 0; i < args.length - 1; i++)
    if (Number(args[i]) >= Number(args[i + 1])) return false;

  return true;
};

/**
 * Checks if all argument are equal.
 *
 * @remarks
 * Evaluated sequentially:
 * `a === b === c` is evaluated as `(a === b) && (b === c)`
 *
 * @param args - Primitive arguments
 *
 * @returns `true` if all comparisons are satisfied, otherwise `false`
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const equal: OperatorFn = function (...args): OperatorReturn {
  for (let i = 0; i < args.length - 1; i++) if (args[i] !== args[i + 1]) return false;

  return true;
};

/**
 * Checks if each argument is not equal to the next.
 *
 * @remarks
 * Evaluated sequentially:
 * `a !== b !== c` is evaluated as `(a !== b) && (b !== c)`
 *
 * @param args - Primitive arguments
 *
 * @returns `true` if all comparisons are satisfied, otherwise `false`
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const pairwiseNotEqual: OperatorFn = function (...args): OperatorReturn {
  for (let i = 0; i < args.length - 1; i++) if (args[i] === args[i + 1]) return false;

  return true;
};

/**
 * Checks if all arguments are mutually different.
 *
 * @remarks
 * Each argument is compared with every other argument:
 * `a !== b && a !== c && b !== c`
 *
 * @param args - Primitive arguments
 *
 * @returns `true` if all arguments are pairwise distinct, otherwise `false`
 *
 * @since 1.0.0
 * @category Operation
 * @author David Schummer
 */
const notEqual: OperatorFn = function (...args): OperatorReturn {
  for (let i = 0; i < args.length; i++)
    for (let j = i + 1; j < args.length; j++) if (args[i] === args[j]) return false;

  return true;
};

/**
 * Performs a logical AND across all arguments.
 *
 * @remarks
 * Evaluated sequentially:
 * `a && b && c` is evaluated as `(a && b) && c`
 *
 * All arguments are converted to boolean before evaluation.
 *
 * @param args - Primitive arguments
 *
 * @returns `true` if all arguments are truthy, otherwise `false`
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 * @author David Schummer
 */
const and: OperatorFn = function (...args): OperatorReturn {
  return !args.some((arg) => !arg);
};

/**
 * Performs a logical OR across all arguments.
 *
 * @returns `true` if at least one argument is truthy, otherwise `false`
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 * @author David Schummer
 */
const or: OperatorFn = function (...args): OperatorReturn {
  return args.some((arg) => Boolean(arg));
};

/**
 * Performs a logical exclusive OR across all arguments.
 *
 * @remarks
 * Returns `true` if exactly one argument is truthy.
 *
 * @param args - Primitive arguments
 *
 * @returns `true` if exactly one argument is truthy, otherwise `false`
 *
 * @since 1.0.0
 * @category Operation
 * @author David Schummer
 */
const xor: OperatorFn = (...args): OperatorReturn => args.filter(Boolean).length === 1;

/**
 * Negates the first argument.
 *
 * @remarks
 * Only the first argument is used. Additional arguments are ignored.
 *
 * @param args - Primitive arguments
 *
 * @returns Logical negation of the first argument
 */
const not: OperatorFn = function (...args): OperatorReturn {
  return !args[0];
};

/**
 * Applies a bitwise OR across all arguments.
 *
 * @remarks
 * Evaluated from left to right:
 * `a | b | c` is evaluated as `(a | b) | c`
 *
 * All arguments are converted to numbers before evaluation.
 *
 * @param args - Numeric arguments
 *
 * @returns Result of the bitwise OR operation
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 * @author David Schummer
 */
const bitwiseOr: OperatorFn = function (...args): OperatorReturn {
  let result = 0;

  for (const arg of args) result |= Number(arg);

  return result;
};

/**
 * Applies a bitwise AND across all arguments.
 *
 * @remarks
 * Evaluated from left to right:
 * `a & b & c` is evaluated as `(a & b) & c`
 *
 * All arguments are converted to numbers before evaluation.
 *
 * @param args - Numeric arguments
 *
 * @returns Result of the bitwise AND operation
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 * @author David Schummer
 */
const bitwiseAnd: OperatorFn = function (...args): OperatorReturn {
  let result = Number(args[0]!);

  for (const arg of args.slice(1)) result &= Number(arg);

  return result;
};

/**
 * Applies a bitwise XOR across all arguments.
 *
 * @remarks
 * Evaluated from left to right:
 * `a ^ b ^ c` is evaluated as `(a ^ b) ^ c`
 *
 * All arguments are converted to numbers before evaluation.
 *
 * @param args - Numeric arguments
 *
 * @returns Result of the bitwise XOR operation
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 * @author David Schummer
 */
const bitwiseXor: OperatorFn = function (...args): OperatorReturn {
  let result = 0;

  for (const arg of args) result ^= Number(arg);

  return result;
};

/**
 * Applies a bitwise NOT to the first argument.
 *
 * @remarks
 * Only the first argument is used. Additional arguments are ignored.
 *
 * All arguments are converted to numbers before evaluation.
 *
 * @param args - Numeric arguments
 *
 * @returns Bitwise NOT of the first argument
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const bitwiseNot: OperatorFn = function (...args): OperatorReturn {
  return ~Number(args.at(0)!);
};

/**
 * Applies a bitwise left shift to the first argument by the second argument.
 *
 * @remarks
 * Only the first two arguments are used. Additional arguments are ignored.
 *
 * All arguments are converted to numbers before evaluation.
 *
 * @param args - Numeric arguments
 *
 * @returns Result of shifting the first argument to the left
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const bitwiseLeftShift: OperatorFn = function (...args): OperatorReturn {
  return Number(args.at(0)!) << Number(args.at(1)!);
};

/**
 * Applies a bitwise left right to the first argument by the second argument.
 *
 * @remarks
 * Only the first two arguments are used. Additional arguments are ignored.
 *
 * All arguments are converted to numbers before evaluation.
 *
 * @param args - Numeric arguments
 *
 * @returns Result of shifting the first argument to the right
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const bitwiseRightShift: OperatorFn = function (...args): OperatorReturn {
  return Number(args.at(0)!) >> Number(args.at(1)!);
};

/**
 * Applies a zero-fill right shift to the first argument by the second argument.
 *
 * @remarks
 * Only the first two arguments are used. Additional arguments are ignored.
 *
 * Unlike the signed right shift (`>>`), this operator fills the left side with zeros.
 *
 * All arguments are converted to numbers before evaluation.
 *
 * @param args - Numeric arguments
 *
 * @returns Result of shifting the first argument to the right with zero-fill
 *
 * @since 1.0.0
 * @category Operation
 * @author Simon Kovtyk
 */
const bitwiseRightShiftZero: OperatorFn = function (...args): OperatorReturn {
  return Number(args.at(0)!) >>> Number(args.at(1)!);
};

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
  pairwiseNotEqual,
  and,
  or,
  xor,
  not,
  greaterThanOrEqual,
  lessThanOrEqual,
  bitwiseOr,
  bitwiseAnd,
  bitwiseXor,
  bitwiseNot,
  bitwiseLeftShift,
  bitwiseRightShift,
  bitwiseRightShiftZero
};
