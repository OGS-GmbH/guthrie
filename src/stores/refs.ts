import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type RefsStore = {
  refs: Record<string, Window | HTMLElement>;
  getRef: (name: string) => Window | HTMLElement;
  addRef: (name: string, ref: Window | HTMLElement) => void
};

const useGuthrieRefs = create<RefsStore>()(
  immer((set, get) => ({
    refs: {},
    getRef: (name: string) => get().refs[name],
    addRef: (name: string, ref: Window| HTMLElement | null) => set((state) => ({
      refs: {
        ...state.refs,
        [name]: ref
      }
    }))
  }))
);

export type {
  RefsStore
}

export {
  useGuthrieRefs
}
