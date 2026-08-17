/**
 * Primitive operator argument.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type PrimitiveOperatorArg = number | boolean | string;

/**
 * Represents an operator argument that may be a primitive value or a nested operation.
 *
 * Nested operations are recursively evaluated and resolved to a {@link PrimitiveOperatorArg}.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type OperatorArg = PrimitiveOperatorArg | OperationDefinition;

/**
 * Represents the return type of an operator.
 *
 * Operators are expected to return primitive values
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type OperatorReturn = boolean | number;

/**
 * Function signature for an operator.
 *
 * Operators receive resolved primitive arguments and return a computed result.
 *
 * @param operationArgs - Resolved primitive arguments
 *
 * @returns Computed operator result
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type OperatorFn = (...operationArgs: PrimitiveOperatorArg[]) => OperatorReturn;

/**
 * Registry of available operators.
 *
 * Maps operator names to their corresponding implementation functions.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type Operators = Record<string, OperatorFn>;

/**
 * Represents an operation to be evaluated.
 *
 * An operation consists of a name referencing an operator and a list of arguments.
 * Arguments may be primitive values or nested operations.
 *
 * @remarks
 * Operations are evaluated recursively via {@link OperatorArg}.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type OperationDefinition = {
  name: string;
  args: OperatorArg[];
};

export type {
  PrimitiveOperatorArg,
  OperatorArg,
  OperatorReturn,
  OperatorFn,
  Operators,
  OperationDefinition
}
