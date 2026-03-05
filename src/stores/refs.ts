import type { ComponentRef, ElementType } from "react";
import { create } from "zustand";

type RefsStore = {
  refs: Record<string, ComponentRef<ElementType>>;
  addRef: (refName: string, ref: ComponentRef<ElementType>) => void
};

const useGuthrieRefs = create<RefsStore>((set) => ({
  refs: {},
  addRef: (refName: string, ref: ComponentRef<ElementType>) => set((state) => ({
    refs: {
      ...state.refs,
      [refName]: ref
    }
  }))
}));

export type {
  RefsStore
}

export {
  useGuthrieRefs
}
