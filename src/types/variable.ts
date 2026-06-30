import { Accessible } from "./access.js";

/**
 * Variable provided in Variable Store {@link useGuthrieVariables}.
 *
 * @since 1.0.0
 * @category Types
 * @author David Schummer
 */
type VariableDeclaration = Accessible & {
  name: string;
};

/**
 * Variable configuration.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovty
 */
type VariablesConfig = Partial<{
  mapping: Partial<{
    dataSource: (value: string) => string;
    event: (value: string) => string;
  }>;
}>;

type Variables = Record<string, unknown>;

export type {
  VariableDeclaration,
  VariablesConfig,
  Variables
}
