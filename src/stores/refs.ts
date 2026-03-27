import { create, StateCreator } from "zustand";

type RefsStore = {
  refs: Record<string, Window | HTMLElement>;
  addRef: (name: string, ref: Window | HTMLElement) => void
};

const stateCreator: StateCreator<RefsStore> = (set) => ({
  refs: {},
  addRef: (name: string, ref: Window | HTMLElement | null): void =>
    set((state) => ({
      refs: {
        ...state.refs,
        [name]: ref!
      }
    }))
})

const useGuthrieRefs = create(
  stateCreator
);

export type {
  RefsStore
}

export {
  useGuthrieRefs
}
