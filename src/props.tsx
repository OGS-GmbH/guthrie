const reservedProps: Record<string, string> = {
  key: "keyName",
  ref: "refName",
  if: "_if",
  elseIf: "_elseIf",
  else: "_else",
  default: "_default"
};

function toUnreservedProps (props: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(props).map(([key, value]) => {
      const unreservedKey = reservedProps[key];

      if (unreservedKey !== undefined)
        return [unreservedKey, value];

      return [key, value];
    })
  )
}

export {
  toUnreservedProps
}
