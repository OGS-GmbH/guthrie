import {createContext, Fragment, useContext} from "react";
import type { DynamicElementProps } from "../renderer/type";
import { Renderer } from "../renderer/renderer";

type ForProps = {
  count: number,
  iterator: {
    children: DynamicElementProps[]
  }
}

type ForContextValue = {
  index: number
}

const ForContext = createContext<ForContextValue>({index: 0});

function useForContext () {
  return useContext(ForContext);
}

function For({count, iterator}: ForProps) {
  // oxlint-disable-next-line no-unused-vars
  return new Array(count).fill(null).map((_, index) => (
    <Fragment key={index}>
      <ForContext.Provider value={{index}}>
        {
          iterator.children.map((child, childIndex) => (
            <Renderer key={childIndex} {...child} />
          ))
        }
      </ForContext.Provider> 
    </Fragment>
  ))
}

export {For}
