import {type ComponentRef, type ElementType} from "react";
import {create} from "zustand";

type GuthrieElemetsState = {
    elements: Record<string, ElementType>,
    setElements: (newElements: Record<string, ElementType>) => void
};
const useGuthrieElements = create<GuthrieElemetsState>((set) => ({
    elements: {},
    setElements: (newElements) => set({elements: newElements})
}))

type RefsState = {
    refs: Record<string, ComponentRef<ElementType>>;
    addRef: (refName: string, ref: ComponentRef<ElementType>) => void
};
const useGuthrieRefs = create<RefsState>((set) => ({
    refs: {},
    addRef: (refName: string, ref: ComponentRef<ElementType>) => set((state)=>
      ({refs: {...state.refs, [refName]: ref}}))
}));

type ContextStore = {
  context: Record<string, unknown>;
  setContext: <T> (key: string, value: T) => void;
  updateContext: <T> (key: string, value: (value: T) => T) => void;
}

const useGuthrieContext = create<ContextStore>((set) => ({
  context: {},
  setContext: <T> (key: string, value: T) => set((state) => ({
    context: {
      ...state.context,
      [key]: value
    }
  })),
  updateContext: <T> (key: string, updateFn: (value: T) => T) => set((state) => ({
    context: {
      ...state.context,
      [key]: updateFn(state.context[key] as T)
    }
  }))
}));

export {useGuthrieElements, useGuthrieRefs, useGuthrieContext}
