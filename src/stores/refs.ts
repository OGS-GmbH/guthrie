import type {RefObject} from "react";
import { create } from "zustand";
import { produce } from "immer";

type RefsStore = {
  refs: Record<string, RefObject<Window | HTMLElement | null>>;
  getRef: (name: string) => RefObject<Window | HTMLElement | null>;
  addRef: (name: string, ref:  RefObject<Window | HTMLElement | null>) => void
};

const useGuthrieRefs = create<RefsStore>((set, get) => ({
  refs: {},
  getRef: (name: string) => get().refs[name],
  addRef: (name: string, ref: RefObject<Window| HTMLElement | null>) => set(
    produce((state) => {
      state.refs[name] = ref;
    })
  )
}));

export type {
  RefsStore
}

export {
  useGuthrieRefs
}
