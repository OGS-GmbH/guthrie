import { useContext } from "react";
import { ScopedVariablesContext } from "../context/variables";
import { Variables } from "../renderer/type";

function useScopedVariables(): Variables {
  return useContext(ScopedVariablesContext);
}

export { useScopedVariables };
