import type {RefObject} from "react";
import { create } from "zustand";
import {refStoreHack} from "../options/fns.ts";

type RefsStore = {
  getRef: (name: string) => RefObject<HTMLElement | null>;
  addRef: (name: string, ref:  RefObject<HTMLElement | null>) => void
};

const useGuthrieRefs = create<RefsStore>(() => ({
  getRef: (name: string) => refStoreHack.get(name),
  addRef: (name: string, ref:  RefObject<HTMLElement | null>) =>  refStoreHack.set(name, ref)
}));

export type {
  RefsStore
}

export {
  useGuthrieRefs
}
