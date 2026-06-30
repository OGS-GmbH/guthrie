import { createContext } from "react";
import { DefaultPropertiesContextValue } from "../types/default-props.js";

const DefaultPropertiesContext = createContext<DefaultPropertiesContextValue | null>(null);

export {
  DefaultPropertiesContext
}
