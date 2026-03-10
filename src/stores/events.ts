import {create} from "zustand";
import {eventStoreHack} from "../options/fns.ts";

type RegisteredEvent = {
  target: HTMLElement | Window,
  listener: { type: string, fn: EventListener }
};

type EventsStore = {
  getEvent: (name) => RegisteredEvent,
  addEvent: (name: string, registeredEvent: RegisteredEvent) => void,
  removeEvent: (name: string) => void
}

const useGuthrieEventStore = create<EventsStore>(() => ({
  getEvent: (name: string) => eventStoreHack.get(name),
  addEvent: (name: string, registeredEvent: RegisteredEvent) => eventStoreHack.set(name, registeredEvent),
  removeEvent: (name: string) => eventStoreHack.delete(name)
}));

type EventsConfigStore = {
  config: { autoApply: boolean };
  setConfig: (config: { autoApply: boolean }) => void
}

const useGuthrieEventsConfigStore = create<EventsConfigStore>((set) => ({
  config: {autoApply: true},
  setConfig: (config: { autoApply: boolean }) => set({config})
}))

export type {
  RegisteredEvent
}

export {
  useGuthrieEventStore,
  useGuthrieEventsConfigStore
}
