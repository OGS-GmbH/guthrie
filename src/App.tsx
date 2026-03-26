import { Guthrie } from "./renderer/root"
import { withElements, withFns, withOperators } from "./options/config"
import type { Page } from "./renderer/type"
import { getMuiComponentBindings } from "@ogs-gmbh/guthrie-mui-bindings";

const page = {
  "route": "/example",
  "events": [
    {
      "name": "click",
      "as": "test-listener",
      "actions": [
        {
          "name": "log",
          "args": ["click {event.target}"]
        }
      ]
    }, {
    "name": "dblclick",
    "as": "dblclick-listener",
    "actions": [
      {
        "name": "log",
        "args": ["dblclick"]
      }
    ]
  }],
  "onInit": [
    {
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
  ],
  "content": {
    "element": "div",
    "ref": "html-ref",
    "events": [
      {
        "name": "click",
        "as": "removeEvents-listener",
        "actions": [
          {
            "name": "removeListener",
            "args": ["window", "click"]
          }
        ]
      }
    ],
    "children": [
      {
        "element": "mui-button",
        "variant": "contained",
        "children": [
          {
            "element": "text",
            "content": "Click me to do nothing"
          }
        ]
      },
      {
        "element": "mui-alert",
        "severity": "error",
        "children": [
          {
            "element": "text",
            "content": "This is an alert with severity = error"
          }
        ]
      },
      {
        "element": "raw-html",
        "content": "<h2>Guthrie</h2>"
      },
      {
        "element": "p",
        "children": [
          {
            "element": "text",
            "content": "Hallo Guthrie"
          }
        ]
      },
      {
        "element": "for",
        "count": 5,
        "iterator": {
          "children": [
            {
              "element": "p",
              "children": [
                {
                  "element": "text",
                  "content": "Hallo Guthrie 5x"
                }
              ]
            }
          ]
        }
      },
      {
        "element": "operation",
        "operation": {
          "name": "add",
          "args": [
            "dataSource.cond-test-const",
            12
          ]
        }
      },
      {
        "element": "variable",
        "name": "gehaltsliste",
        "access": "[0].salary"
      },
      {
        "element": "conditional",
        "if": {
          "condition": "dataSource.cond-test-const",
          "children": [
            {
              "element": "raw-html",
              "content": "<h2>cond-test-const is true</h2>"
            }
          ]
        }
      },
      {
        "element": "conditional",
        "if": {
          "condition": {
            "name": "lt",
            "args": [
              "dataSource.cond-test-const",
              43
            ]
          },
          "children": [
            {
              "element": "raw-html",
              "content": "<h2>42 is less</h2>"
            }
          ]
        }
      },
      {
        "element": "operation",
        "operation": {
          "name": "exp",
          "args": [
            2,
            {
              "name": "div",
              "args": [
                8,
                {
                  "name": "add",
                  "args": [
                    2,
                    6
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        "element": "switch",
        "condition": "dataSource.cond-test-const",
        "cases": {
          41: {
            "children": [
              {
                "element": "raw-html",
                "content": "<h2>case1</h2>"
              }
            ]
          },
          42: {
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
      },
      {
        "element": "conditional",
        "if": {
          "condition": true,
          "children": [
            {
              "element": "raw-html",
              "content": "<h2>Govan</h2>"
            }
          ]
        },
        "elseIf": [
          {
            "condition": false,
            "children": [
              {
                "element": "raw-html",
                "content": "<h2>(aufjedenfall)</h2>"
              }
            ]
          },
          {
            "condition": false,
            "children": [
              {
                "element": "raw-html",
                "content": "<h2>(nicht aufjedenfall)</h2>"
              }
            ]
          }
        ],
        "else": {
          "children": [
            {
              "element": "raw-html",
              "content": "<h2>Best guitarist ever</h2>"
            }
          ]
        }
      }
    ]
  }
} satisfies Page;

function App() {
  return (
    <Guthrie
      elements={withElements({
        elements: getMuiComponentBindings({
          mapNames: (value) => `mui-${value}`
        })
      })}
      operators={
        withOperators({
          options: {
            universal: true
          }
        })
      }
      fns={
        withFns({
          options: {
            native: true
          }
        })
      }
      page={page}
    />
  )
}

export default App
