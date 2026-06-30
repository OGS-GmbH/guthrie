function updateByPath(obj: unknown, value: unknown, path: Array<string | number>) {
  let access: unknown = obj;

  path.forEach((pathItem, index) => {
    const isLast = index === path.length - 1;

    if (isLast) {
      access = value;

      return;
    }

    access = (access as Record<string | number, unknown>)[pathItem];
  })
}

export {
  updateByPath
}
