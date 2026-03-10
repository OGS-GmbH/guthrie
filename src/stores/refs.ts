import type {RefObject} from "react";
import { create } from "zustand";

type RefsStore = {
  refs: Record<string, RefObject<HTMLElement | null>>;
  addRef: (refName: string, ref:  RefObject<HTMLElement | null>) => void
};

const useGuthrieRefs = create<RefsStore>((set) => ({
  refs: {},
  addRef: (refName: string, ref:  RefObject<HTMLElement | null>) => set((state) => ({
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
