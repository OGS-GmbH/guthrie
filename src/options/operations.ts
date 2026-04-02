import type {Operators} from "../renderer/type";
import {
  addition,
  and,
  bitwiseAnd,
  bitwiseLeftShift,
  bitwiseNot,
  bitwiseOr,
  bitwiseRightShift,
  bitwiseRightShiftZero,
  bitwiseXor,
  decrement,
  division,
  equal,
  exponentation,
  greaterThan,
  greaterThanOrEqual,
  increment,
  lessThan,
  lessThanOrEqual,
  modulus,
  multiplication,
  not,
  notEqual,
  or,
  pairwiseNotEqual,
  substraction,
  xor
} from "../operations";

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
  pairwiseNotEqual,
  and,
  or,
  xor,
  not,

  bitwiseOr,
  bitwiseAnd,
  bitwiseXor,
  bitwiseNot,
  bitwiseLeftShift,
  bitwiseRightShift,
  bitwiseRightShiftZero
}

const universalShort: Operators = {
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
  neq: pairwiseNotEqual,

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
  universal,
  universalShort
}
