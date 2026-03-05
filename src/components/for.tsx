import {createContext, Fragment, useContext, type ReactNode} from "react";

type ForProps = { count: number, children: ReactNode }

type ForContextValue = {
  index: number
}

const ForContext = createContext<ForContextValue>({index: 0});

function useForContext () {
  return useContext(ForContext);
}

function For({count, children}: ForProps) {
  // oxlint-disable-next-line no-unused-vars
  return new Array(count).fill(null).map((_, index) => (
    <ForContext.Provider value={{index}}>
      <Fragment key={index}>{children}</Fragment>
    </ForContext.Provider> 
  ))
}

export {For}
