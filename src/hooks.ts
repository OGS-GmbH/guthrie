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

export {useGuthrieElements, useGuthrieRefs}
