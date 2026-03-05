import {type ReactNode} from "react";

type IfProps = {
  condition: boolean,
  children: ReactNode[],
  refName: string
};

function If({refName, condition, children}: IfProps) {
  
  return (
    <>
      <button onClick={()=> {
        updateContext(refName, (cond) => !cond);
      }}>
        GEHT AB
      </button>
      {fullfilled && children}
    </>
)
}

export {If}
