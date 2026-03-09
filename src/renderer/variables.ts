const templateChars = {
  start: "{",
  end: "}"
}

const templateOperators = {
  addition: "+",
  subtraction: "-",
  multiplication: "*",
  exponentiation: "**",
  division: "/",
  modulus: "%",
  increment: "++",
  decrement: "--",

  assign: "=",
  addAssign: "+=",
  subtractAssign: "-=",
  multiplyAssign: "*=",
  divideAssign: "/=",
  modulusAssign: "%=",
  exponentiationAssign: "**=",

  equal: "==",
  strictEqual: "===",
  notEqual: "!=",
  strictNotEqual: "!==",
  greaterThan: ">",
  lessThan: "<",
  greaterThanOrEqual: ">=",
  lessThanOrEqual: "<=",

  logicalAnd: "&&",
  logicalOr: "||",
  logicalNot: "!",

  bitwiseAnd: "&",
  bitwiseOr: "|",
  bitwiseXor: "^",
  bitwiseNot: "~",

  leftShift: "<<",
  signedRightShift: ">>",
  unsignedRightShift: ">>>"
}

function getVariables (value: string): string[] | null {
  let variableName: string | null = null;
  let variableNames: string[] | null = null;

  for (const char of value) {
    if (char === templateChars.start) {
      variableName = "";
      continue;
    }

    if (char === templateChars.end) {
      if (variableName !== null)
        variableNames === null
          ? (variableNames = [variableName])
          : variableNames.push(variableName)

      variableName = null;

      continue;
    }

    if (variableName === null)
      continue;

    variableName += char;
  }
  
  return variableNames;
}
