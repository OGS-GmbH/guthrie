import { createContext } from "react";
import { Variables } from "../renderer/type";

const ScopedVariablesContext = createContext<Variables>({});

export { ScopedVariablesContext };
