import { ReactNode } from "react";
import { DefaultPropertiesContext } from "../context/default-props.js";
import { DefaultPropertiesContextValue } from "../types/default-props.js";

type DefaultPropertiesProviderProps = DefaultPropertiesContextValue & {
  children: ReactNode;
};

function DefaultPropertiesProvider({
  children,
  ...props
}: DefaultPropertiesProviderProps) {
  return (
    <DefaultPropertiesContext value={props}>
      {children}
    </DefaultPropertiesContext>
  )
}

export type {
  DefaultPropertiesProviderProps
}

export {
  DefaultPropertiesProvider
}
