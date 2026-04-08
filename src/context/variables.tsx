import { createContext } from "react";
import { Variables } from "../renderer/type.js";

const ScopedVariablesContext = createContext<Variables>({});

export { ScopedVariablesContext };
