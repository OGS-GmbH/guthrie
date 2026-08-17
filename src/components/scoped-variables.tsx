"use client";

import {ReactNode, useMemo} from "react";
import {ScopedVariablesContext} from "../context/variables.js";
import {useScopedVariables} from "../hooks/scoped-variables.js";
import {Exposable} from "../types/access.js";
import {Variables} from "../types/variable.js";

/**
 * Props for the {@link ScopedVariables} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type ScopedVariablesProps = Exposable & {
  value: unknown;
  children: ReactNode;
};

/**
 * Sets a scoped variable for nested children.
 *
 * @returns React Component
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
function ScopedVariables({ as, value, children }: ScopedVariablesProps) {
  const scopedVariables = useScopedVariables();
  const variables = useMemo(
    (): Variables =>
      as
        ? {
            ...scopedVariables,
            [as]: value
          }
        : scopedVariables,
    [scopedVariables, as, value]
  );

  return (
    <ScopedVariablesContext.Provider value={variables}>{children}</ScopedVariablesContext.Provider>
  );
}

export type { ScopedVariablesProps };

export { ScopedVariables };
