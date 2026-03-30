import type { Events } from "../renderer/type";
import { create, StateCreator, StoreApi, UseBoundStore } from "zustand";

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
  removeEvent: (ref: string, name: string) => set((state) => ({
    events: {
      ...state.events,
      [ref]: {
        ...state.events[ref]!,
        [name]: undefined
      }
    }
  }))
})

const useGuthrieEvents: UseBoundStore<StoreApi<EventsStore>> = create(
  stateCreator
);


export {
  useGuthrieEvents,
}
