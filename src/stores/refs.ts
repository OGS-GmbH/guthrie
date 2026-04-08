import { create, StateCreator, StoreApi, UseBoundStore } from "zustand";

/**
 * Store for managing DOM and window references.
 *
 * Stores references by name, allowing elements to be accessed
 * and used across the runtime (e.g. for event binding).
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
type RefsStore = {
  refs: Record<string, Window | HTMLElement>;
  addRef: (name: string, ref: Window | HTMLElement | null) => void;
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
});

/**
 * Zustand store for accessing and managing references.
 *
 * @remarks
 * Used by the renderer and event system to resolve references to DOM elements
 * by name (e.g. `"window"` or element refs).
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
const useGuthrieRefs: UseBoundStore<StoreApi<RefsStore>> = create(stateCreator);

export type { RefsStore };

export { useGuthrieRefs };
