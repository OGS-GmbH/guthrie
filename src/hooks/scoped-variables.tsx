import { useContext } from "react";
import { ScopedVariablesContext } from "../context/variables.js";
import { Variables } from "../renderer/type.js";

function useScopedVariables(): Variables {
  return useContext(ScopedVariablesContext);
}

export { useScopedVariables };
