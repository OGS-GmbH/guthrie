import { useMemo, type ReactNode } from "react";
import { useGuthrieVariables } from "../stores/variables"

const IS_DOT_MASK = 0b1;
const IS_INDEX_MASK = 0b01;

function tryFromNumber (value: string) {
  const num = Number.parseInt(value, 10);

  return Number.isNaN(num) ? value : num;
}

function getPath (value: string): Array<string | number> {
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

function touchByPath (value: unknown, path: Array<string | number>): unknown {
  let touchedValue: unknown = value;

  for (const pathItem of path)
    touchedValue = touchedValue[pathItem];

  return touchedValue;
}

type VariableProps = {
  name: string,
  access?: string
}

function Variable ({name, access}: VariableProps): ReactNode {
  const variable = useGuthrieVariables((state) => state.variables[name]);
  const value = useMemo(() => {
    if (variable === undefined)
      return;

    if (!access)
      return variable;

    const path = getPath(access);

    return touchByPath(variable, path);
  }, [access, variable]);

  // oxlint-disable eslint-plugin-react(jsx-no-useless-fragment)
  return (
    <>
      {value}
    </>
  );
  // oxlint-enable eslint-plugin-react(jsx-no-useless-fragment)
}

export {
  Variable
}
