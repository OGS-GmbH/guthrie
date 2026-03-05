import {useEffect, type ReactNode} from "react";
import { useGuthrieContext } from "../hooks";

type ElseProps = {
  ifRef: string,
  children: ReactNode[]
};

function Else({ ifRef, children }: ElseProps) {
  const contextCondition = useGuthrieContext(state => state.context[ifRef]);

  useEffect(() => {
    console.log("Else", !contextCondition)
  }, [contextCondition])

  return contextCondition !== undefined && !contextCondition && children
}

export {Else}
