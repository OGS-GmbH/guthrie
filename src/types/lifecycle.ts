import { ExposableFnDeclaration } from "./function.js";

/**
 * Lifecycle hooks for {@link Render}.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type Lifecycle = Partial<{
  onInit: ExposableFnDeclaration[];
  onRender: ExposableFnDeclaration[];
  onDestroy: ExposableFnDeclaration[];
}>;

export type {
  Lifecycle
}
