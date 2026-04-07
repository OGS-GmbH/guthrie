---
prev: false
next: false
---

# Getting started

## Installation

### Prerequisites

- Node.js version 18 or higher.
- A package manager: e.g. npm, pnpm, ...

::: code-group

```sh [npm]
$ npm add @ogs-gmbh/rolldown-plugin-assets
```

```sh [pnpm]
$ pnpm add @ogs-gmbh/rolldown-plugin-assets
```

```sh [yarn]
$ yarn add @ogs-gmbh/rolldown-plugin-assets
```

```sh [bun]
$ bun add @ogs-gmbh/rolldown-plugin-assets
```

:::

### Usage

`Guthrie` is used to render declarative page objects.

```tsx [example-app.tsx]
import { Guthrie } from "@ogs-gmbh/guthrie";
import type { Page } from "@ogs-gmbh/guthrie";

export function ExampleApp() {
  const page = {
    route: "exapmle-route",
    content: {
      element: "main",
      children: [{
        element: "h1",
        children: [{
          element: "text",
          content: "Hello to Guthries Stage"
        }]
      }]
    }
  } satisfies Page;

  return (
    <Guthrie
      page={page}
      elements={{}}
      fns={{}}
      operators={{}}
    />
  )
};
```
