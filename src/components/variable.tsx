import { useMemo, type ReactNode } from "react";
import { useGuthrieVariables } from "../stores/variables"
import { getPath, touchByPath } from "../renderer/variables";

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
