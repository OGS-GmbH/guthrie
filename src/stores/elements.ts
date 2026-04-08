import { create, StateCreator, StoreApi, type UseBoundStore } from "zustand";
import type { Elements } from "../renderer/type.js";

/**
 * Store for managing the element registry.
 *
 * Holds all available elements used by the renderer and provides
 * a method to update them.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
type ElementsStore = {
  elements: Elements;
  setElements: (elements: Elements) => void;
};

const stateCreator: StateCreator<ElementsStore> = (set) => ({
  elements: {},
  setElements: (elements: Elements) => set({ elements })
});

/**
 * Zustand store for accessing and updating elements.
 *
 * @remarks
 * Used by the {@link Renderer} to resolve components dynamically.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
const useGuthrieElements: UseBoundStore<StoreApi<ElementsStore>> = create(stateCreator);

export type { ElementsStore };

export { useGuthrieElements };
