---
prev: false
next: false
---

# Events

Events allow you to declaratively attach behavior to elements.

Instead of defining event handlers in components, events are described as part of the element configuration and executed via functions.

---

## Usage

Guthrie supports almost any kind of expression that can be done in JavaScript.
Here, we provide a simple example.

Refer to the [reference](/reference) for a complete overview.

> [!IMPORTANT]
> Events are only registered if a `ref` is provided.

```tsx [example-component.tsx]
import { Guthrie } from "@ogs-gmbh/guthrie";
import type { Page } from "@ogs-gmbh/guthrie";

const page = {
  content: {
    element: "main",
    children: [
      {
        element: "h1",
        ref: "test", // unique ref value
        events: [
          {
            name: "mousedown", // event name
            actions: [
              {
                name: "log", // registered function name
                args: [
                  {
                    type: "event",
                    access: [
                      {
                        type: "property",
                        read: "target"
                      }
                    ]
                  }
                ]
              }
            ]
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
