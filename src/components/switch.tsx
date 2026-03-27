import {useEffect, useState} from "react"
import {type DynamicElementProps, type VariableWithAccess} from "../renderer/type"
import {Renderer} from "../renderer/renderer";
import {useGuthrieVariables} from "../stores/variables";
import {touchByAccess} from "../renderer/variables";

type InnerCase = {
  children: DynamicElementProps[]
};

type Case = Record<string | number, InnerCase>;

type SwitchProps = {
  condition: string | number | boolean | VariableWithAccess,
  cases: Case,
  default: InnerCase
};

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

    if (access === undefined)
      return;

    touchByAccess(variable, access).then((result) => {
      if (cancelled) return;

      setActiveCase(cases[result as string] ?? props["default"]);
    });

    return () => {
      cancelled = true;
    };
  }, [variable, access, cases, props, isPrimitive]);

  const primitiveCase = isPrimitive
    ? cases[
    typeof condition === "number"
      ? condition
      : condition.toString()
    ] ?? props["default"]
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

export {
  Switch
}
