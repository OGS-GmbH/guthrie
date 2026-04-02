import type { Events } from "../renderer/type";
import { create, StateCreator, StoreApi, UseBoundStore } from "zustand";

/**
 * Store for managing registered event listeners.
 *
 * Events are stored per reference and event name, allowing dynamic
 * registration and removal of listeners.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
type EventsStore = {
  events: Record<string, Events>,
  addEvent: (ref: string, name: keyof GlobalEventHandlersEventMap, listener: EventListener) => void,
  removeEvent: (ref: string, name: keyof GlobalEventHandlersEventMap) => void
}

const stateCreator: StateCreator<EventsStore> = (set) => ({
  events: {},
  addEvent: (
    ref: string,
    name: keyof GlobalEventHandlersEventMap,
    listener: EventListener
  ) => set((state) => ({
    events: {
      ...state.events,
      [ref]: {
        ...state.events[ref]!,
        [name]: listener
      }
    }
  })),
  removeEvent: (ref: string, name: keyof GlobalEventHandlersEventMap) => set((state) => ({
    events: {
      ...state.events,
      [ref]: {
        ...state.events[ref]!,
        [name]: undefined
      }
    }
  }))
})

/**
 * Zustand store for accessing and managing event listeners.
 *
 * @remarks
 * Used internally by {@link callFn} to track and replace listeners.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
const useGuthrieEvents: UseBoundStore<StoreApi<EventsStore>> = create(
  stateCreator
);

export type {
  EventsStore
}

export {
  useGuthrieEvents,
}
