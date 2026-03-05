import { useEffect, useMemo } from "react";
import { useGuthrieContext } from "../hooks";
import { usePreviousState } from "@ogs-gmbh/react-hooks";

type ElseIfProps = {
  ifRef: string,
  condition: boolean,
  children: React.ReactNode[]
}

function ElseIf ({ifRef, condition, children}: ElseIfProps) {
  const contextCondition = useGuthrieContext(state => state.context[ifRef]);
  const previousContextCondition = usePreviousState(contextCondition);
  const setContext = useGuthrieContext(state => state.updateContext);
  const fullfilled = useMemo(() => !previousContextCondition && condition, [previousContextCondition, condition]);

  useEffect(() => {
    if (!fullfilled)
      return;

    setContext(ifRef, (prev) => !prev && condition)
  }, [condition])

  useEffect(() => {
    console.log("Else if", fullfilled)
  }, [fullfilled])

  return fullfilled && children;
}

export {
  ElseIf
}
