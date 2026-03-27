import type {Access} from "./type.ts";

const templateChars = {
  start: "{",
  end: "}"
}

function getVariables(value: string): string[] | null {
  let variableName: string | null = null;
  let variableNames: string[] | null = null;

  for (const char of value) {
    if (char === templateChars.start) {
      variableName = "";
      continue;
    }

    if (char === templateChars.end && variableName !== null) {
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

const IS_DOT_MASK = 0b1;
const IS_INDEX_MASK = 0b01;

function tryFromNumber(value: string) {
  const num = Number.parseInt(value, 10);

  return Number.isNaN(num) ? value : num;
}

function getPath(value: string): Array<string | number> {
  let state = 0b0;
  let access = "";
  const path = [];

  for (let i = 0; i <= value.length; i++) {
    const char = value[i];

    if (char === ".") {
      if (state !== 0b0) {
        path.push(tryFromNumber(access));
        access = "";
      }

      state = IS_DOT_MASK;
      continue;
    }

    if (char === "[") {
      if (state !== 0b0) {
        path.push(tryFromNumber(access));
        access = "";
      }

      state = IS_INDEX_MASK;
      continue;
    }

    if (char === "]") {
      if (state !== 0b0) {
        path.push(tryFromNumber(access));
        access = "";
      }

      state = 0b0;

      continue;
    }

    if (state === IS_INDEX_MASK && (char === "\"" || char === "'"))
      continue;

    if (state === 0b0)
      continue;

    if (i === value.length && state === IS_DOT_MASK) {
      path.push(access);
      continue;
    }

    access += char;
  }

  return path;
}

async function touchByAccess<T>(value: unknown, access: Access): Promise<T> {
  let touchedValue: T = value as T;

  for (const accessItem of access) {
    switch (accessItem.type) {
      case "prototype":
        touchedValue = await (touchedValue as Record<string, () => T>)[accessItem.read]!();
        break;

     default:
        touchedValue = (touchedValue as Record<string, T>)[accessItem.read]!;
    }
  }

  return touchedValue;
}

export {
  getVariables,
  getPath,
  touchByAccess
}
