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
$ npm add @ogs-gmbh/guthrie
```

```sh [pnpm]
$ pnpm add @ogs-gmbh/guthrie
```

```sh [yarn]
$ yarn add @ogs-gmbh/guthrie
```

```sh [bun]
$ bun add @ogs-gmbh/guthrie
```

:::

### Usage

Guthrie offers almost any kind of expression, that can be done JavaScript-wise. Here, we provide just a simple example. Refer to our [reference](/reference) get a better understanding.

```tsx [example-component.tsx]
import { Guthrie } from "@ogs-gmbh/guthrie";
import type { Page } from "@ogs-gmbh/guthrie";

const page = {
  route: "example-route",
  content: {
    element: "main",
    children: [
      {
        element: "h1",
        children: [
          {
            element: "text",
            content: "Hello to Guthries Stage"
          }
        ]
      }
    ]
  }
} satisfies Page;

export function ExampleComponent() {
  return <Guthrie page={page} elements={{}} fns={{}} operators={{}} />;
}
```
