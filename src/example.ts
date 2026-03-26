import type {ExposableEvent, ExposableFn, Page} from "./renderer/type.ts";

const exampleActionFetch: ExposableFn = {
  "name": "fetch",
  "args": [
    "https://jsonplaceholder.typicode.com/todos/1",
    {
      "type": "arg",
      "method": "get"
    }
  ],
  "as": "gehaltsliste"
}

const exampleEventClick: ExposableEvent = {
  name: "click",
  actions: [{
    name: "log",
    args: [{
      type: "event",
      access: [{
        type: "property",
        read: "clientX"
      }]
    }]
  }]
}

const exampleSwitch = {
  "element": "switch",
  "condition": {
    name: "gehaltsliste",
    access: [{
      type: "prototype",
      read: "clone"
    }, {
      type: "prototype",
      read: "json"
    }, {
      type: "property",
      read: "title"
    }]
  },
  "cases": {
    1: {
      "children": [
        {
          "element": "raw-html",
          "content": "<h2>case1</h2>"
        }
      ]
    },
    "delectus aut autem": {
      "children": [
        {
          "element": "raw-html",
          "content": "<h2>case2</h2>"
        }
      ]
    },
    43: {
      "children": [
        {
          "element": "raw-html",
          "content": "<h2>case3</h2>"
        }
      ]
    },
  },
  "default": {
    "children": [
      {
        "element": "raw-html",
        "content": "<h2>default case</h2>"
      }
    ]
  }
};

export const examplePage = {
  route: "example-route",
  events: [
    exampleEventClick
  ],
  onInit: [
    exampleActionFetch
  ],
  content: {
    element: "main",
    properties: {
      style: {
        type: "static",
        value: {
          backgroundColor: "green"
        }
      },
      className: {
        type: "variable",
        name: "gehaltsliste",
        access: [{
          type: "prototype",
          read: "clone"
        }, {
          type: "prototype",
          read: "json"
        }, {
          type: "property",
          read: "title"
        }]
      },
      test: {
        type: "fn",
        name: "test",
        args: [10, 6],
        access: [{
          type: "property",
          read: "result"
        }]
      }
    },
    children: [{
      element: "h1",
      children: [{
        element: "text",
        properties: {
          content: {
            type: "static",
            value: "Guthrie"
          }
        }
      }]
    }, {
      "element": "switch",
      "condition": {
        name: "gehaltsliste",
        access: [{
          type: "prototype",
          read: "clone"
        }, {
          type: "prototype",
          read: "json"
        }, {
          type: "property",
          read: "title"
        }]
      },
      "cases": {
        1: {
          "children": [
            {
              "element": "raw-html",
              "content": "<h2>case1</h2>"
            }
          ]
        },
        "delectus aut autem": {
          "children": [
            {
              "element": "raw-html",
              "content": "<h2>case2</h2>"
            }
          ]
        },
        43: {
          "children": [
            {
              "element": "raw-html",
              "content": "<h2>case3</h2>"
            }
          ]
        },
      },
      "default": {
        "children": [
          {
            "element": "raw-html",
            "content": "<h2>default case</h2>"
          }
        ]
      }
    }]
  }

} satisfies Page
