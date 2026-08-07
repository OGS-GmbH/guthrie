import { FnArgsDeclaration } from "../public-api.js";
import { WithType } from "./type.js";

/**
 * Describes property access on an object.
 *
 * Used by {@link touchByAccess} to resolve a value via a property key.
 *
 * @since 1.0.0
 * @category Types
 * @author David Schummer
 */
type PropertyAccessDeclaration = WithType<"property"> & {
  read: string;
};

/**
 * Describes index-based access on an array or array-like structure.
 *
 * Used by {@link touchByAccess} to resolve a value via a numeric index.
 *
 * @since 1.0.0
 * @category Types
 * @author David Schummer
 */
type IndexAccessDeclaration = WithType<"index"> & {
  read: number;
};

/**
 * Describes access to a property on an object's prototype.
 *
 * Used by {@link touchByAccess} to resolve values via the prototype chain.
 *
 * @since 1.0.0
 * @category Types
 * @author David Schummer
 */
type PrototypeAccessDeclaration = WithType<"prototype"> & {
  read: string;
  args?: FnArgsDeclaration;
};

type Optionalable = {
  optional?: boolean
}

/**
 * Access chain for resolving nested values.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 * @author David Schummer
 */
type AccessDeclaration = Array<(PrototypeAccessDeclaration | PropertyAccessDeclaration | IndexAccessDeclaration) & Optionalable>;

/**
 * Allows accessing nested values.
 *
 * @since 1.0.0
 * @category Types
 * @author David Schummer
 */
type Accessible = {
  access?: AccessDeclaration;
};


/**
 * Allows assigning a result to a variable.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type Exposable = Partial<{
  as: string;
}>;

export type {
  PropertyAccessDeclaration,
  IndexAccessDeclaration,
  PrototypeAccessDeclaration,
  Optionalable,
  AccessDeclaration,
  Accessible,
  Exposable,
}
