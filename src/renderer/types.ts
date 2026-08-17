import { DefaultPropertiesDeclaration, DefaultRawPropertiesDeclaration } from "../types/default-props.js";
import { ElementDeclaration } from "../types/element.js";
import { ExposableEventDeclaration } from "../types/event.js";
import { Lifecycle } from "../types/lifecycle.js";

/**
 * Page definition.
 *
 * Represents a complete renderable unit including content,
 * events, and lifecycle hooks.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 * @author David Schummer
 */
type Render = {
  content: ElementDeclaration;
  events?: ExposableEventDeclaration[];
  defaultProperties?: DefaultPropertiesDeclaration;
  defaultRawProperties?: DefaultRawPropertiesDeclaration;
} & Lifecycle;

export type {
  Render
}
