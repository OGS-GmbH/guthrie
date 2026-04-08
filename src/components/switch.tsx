import { useEffect, useState } from "react";
import { Renderer } from "../renderer/renderer";
import { type DynamicElementProps, type VariableWithAccess } from "../renderer/type";
import { touchByAccess } from "../renderer/variables";
import { useGuthrieVariables } from "../stores/variables";

/**
 * Internal structure describing a single case branch.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type InnerCase = {
  /** Elements rendered when the case matches */
  children: DynamicElementProps[];
};

/**
 * Mapping of possible values to their corresponding case branches.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type Case = Record<string | number, InnerCase>;

/**
 * Props for the {@link Switch} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 * @author David Schummer
 */
type SwitchProps = {
  condition: string | number | boolean | VariableWithAccess;
  cases: Case;
  default: InnerCase;
};

/**
 * Renders content based on a matching case.
 *
 * This component behaves similarly to a switch-case statement.
 * It resolves the given condition and renders the corresponding case.
 *
 * @remarks
 * - Supports primitive values (string, number, boolean)
 * - Supports variable-based conditions via {@link VariableWithAccess}
 * - Async resolution is handled via {@link touchByAccess}
 * - Falls back to `default` if no case matches
 *
 * @returns React Component
 *
 * @since 1.0.0
 * @category Components
 * @author your name
 */
function Switch({ condition, cases, ...props }: SwitchProps) {
  const isPrimitive =
    typeof condition === "string" ||
    typeof condition === "number" ||
    typeof condition === "boolean";

  const variable = useGuthrieVariables((state) =>
    isPrimitive ? undefined : state.variables[condition.name]
  );

  const access = isPrimitive ? undefined : condition.access;

  const [activeCase, setActiveCase] = useState<InnerCase | undefined>();

  useEffect(() => {
    if (isPrimitive || !variable) return;

    let cancelled = false;

    if (access === undefined) return;

    touchByAccess(variable, access).then((result) => {
      if (cancelled) return;

      setActiveCase(cases[result as string] ?? props["default"]);
    });

    return () => {
      cancelled = true;
    };
  }, [variable, access, cases, props, isPrimitive]);

  const primitiveCase = isPrimitive
    ? (cases[typeof condition === "number" ? condition : condition.toString()] ?? props["default"])
    : undefined;

  const resolvedCase = isPrimitive ? primitiveCase : activeCase;

  if (!resolvedCase) return null;

  return (
    <>
      {resolvedCase.children.map((child, index) => (
        <Renderer key={index} {...child} />
      ))}
    </>
  );
}

export type { InnerCase as InnerSwitchCase, Case as SwitchCase, SwitchProps };

export { Switch };
