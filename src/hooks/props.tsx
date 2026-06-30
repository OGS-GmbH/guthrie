import { useContext, useMemo } from "react";
import { DefaultPropertiesContext } from "../context/default-props.js";
import { PropertiesDeclaration, RawPropertiesDeclaration } from "../types/element.js";

type UseDefaultPropertiesReturn = {
  properties?: PropertiesDeclaration,
  rawProperties?: RawPropertiesDeclaration
}

function useDefaultProperties(element: string): UseDefaultPropertiesReturn {
  const consumer = useContext(DefaultPropertiesContext)!;

  return useMemo((): UseDefaultPropertiesReturn => {
    const properties = consumer.properties?.[element];
    const rawProperties = consumer.rawProperties?.[element];

    return {
      properties,
      rawProperties
    }
  }, [consumer, element]);
}

export {
  useDefaultProperties
}
