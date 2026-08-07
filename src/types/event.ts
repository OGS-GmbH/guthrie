import {Accessible, Exposable} from "./access.js";
import { ExposableFnDeclaration, FnArgsDeclaration } from "./function.js";
import { WithType } from "./type.js";
import {VariableDeclaration} from "./variable.js";

/**
 * Event configuration.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type EventConfig = {
  autoApply: boolean;
};

type FunctionEventActionDeclaration = WithType<"fn"> & ExposableFnDeclaration & {condition?: ExposableFnDeclaration};

type VariableEventActionDeclaration = WithType<"var"> & VariableDeclaration & { args?: FnArgsDeclaration };

type CallbackEventActionDeclaration = WithType<"callback"> & Accessible & {condition?: ExposableFnDeclaration};

type EventActionDeclaration = FunctionEventActionDeclaration | VariableEventActionDeclaration | CallbackEventActionDeclaration;

type EventActionsDeclaration = EventActionDeclaration[];

/**
 * Event definition.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type EventDeclaration = {
  name: keyof GlobalEventHandlersEventMap;
  actions: EventActionsDeclaration;
};

/**
 * Event with variable assignment support.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type ExposableEventDeclaration = EventDeclaration & Exposable;

/**
 * Registered DOM events.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 * @author David Schummer
 */
type Events = Record<keyof GlobalEventHandlersEventMap, EventListener>;

export type {
  EventConfig,
  FunctionEventActionDeclaration,
  VariableEventActionDeclaration,
  CallbackEventActionDeclaration,
  EventActionDeclaration,
  EventActionsDeclaration,
  EventDeclaration,
  ExposableEventDeclaration,
  Events
}
