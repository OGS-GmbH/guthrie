import { toMerged } from "es-toolkit";

function toMergedMany(...sources: object[]) {
  return sources.reduce((acc, curr) => toMerged(acc, curr));
}

export {
  toMergedMany
}
