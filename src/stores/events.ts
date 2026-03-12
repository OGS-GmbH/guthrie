import type { EventConfig, Events } from "../renderer/type";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type EventsStore = {
  events: Record<string, Events>,
  addEvent: (ref: string, name: keyof GlobalEventHandlersEventMap, listener: EventListener) => void,
  removeEvent: (ref: string, name: keyof GlobalEventHandlersEventMap) => void
}

const useGuthrieEvents = create<EventsStore>()(
  immer((set) => ({
    events: {},
    addEvent: (ref: string, name: keyof GlobalEventHandlersEventMap, listener: EventListener) => set((state) => {
      state.events[ref][name] = listener
    }),
    removeEvent: (ref: string, name: string) => set((state) => {
      state.events[ref][name] = undefined;
    })
  }))
);

type EventsConfigStore = {
  config: EventConfig;
  setConfig: (config: EventConfig) => void
}

const useGuthrieEventsConfig = create<EventsConfigStore>((set) => ({
  config: {
    autoApply: true
  },
  setConfig: (config: EventConfig) => set({config})
}))

export {
  useGuthrieEvents,
  useGuthrieEventsConfig
}
