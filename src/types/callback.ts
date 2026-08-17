import { ExposableFnDeclaration } from "./function.js";
import { WithType } from "./type.js";
import { type VariableDeclaration } from "./variable.js";

type CallbackDoFnDeclaration = WithType<"fn"> & ExposableFnDeclaration;

type CallbackDoVarDeclaration = WithType<"var"> & VariableDeclaration;

type CallbackDoItemDeclaration = CallbackDoFnDeclaration | CallbackDoVarDeclaration;

type CallbackDoDeclaration = CallbackDoItemDeclaration[];

type CallbackDeclaration = {
  do: CallbackDoDeclaration,
  eventIndex?: number,
  takeAs?: string
}

export type {
  CallbackDoFnDeclaration,
  CallbackDoVarDeclaration,
  CallbackDoItemDeclaration,
  CallbackDoDeclaration,
  CallbackDeclaration
}

