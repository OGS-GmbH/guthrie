import type { EventConfig, Events } from "../renderer/type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
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
      if (!state.events[ref])
        state.events[ref] = {} as Events;

      state.events[ref][name] = listener
    }),
    removeEvent: (ref: string, name: string) => set((state) => {
      state.events[ref] && delete state.events[ref][name]
    })
  }))
);

type EventsConfigStore = {
  config: EventConfig;
  setConfig: (config: EventConfig) => void
}

const useGuthrieEventsConfig = create<EventsConfigStore>()(
  devtools(
    (set) => ({
      config: {
        autoApply: true
      },
      setConfig: (config: EventConfig) => set({config})
    })
  )
)

export {
  useGuthrieEvents,
  useGuthrieEventsConfig
}
