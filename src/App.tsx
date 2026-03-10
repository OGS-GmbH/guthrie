import { Guthrie } from "./renderer/root"
import { withElements, withFns, withOperators } from "./options/config"
import type { Page } from "./renderer/type"

const page = {
  "route": "/example",
  "events": [{
    "type": "click",
    "as": "test-listener",
    "actions": [{
      "fn": "log",
      "args": ["{event.target}"]
    }]
  }],
  "dataSources": [
    {
      "type": "fn",
      "fn": "fetch",
      "args": [
        "https://jsonplaceholder.typicode.com/todos/1",
        {
          "method": "get"
        }
      ],
      "as": "gehaltsliste"
    },
    {
      "type": "constant",
      "value": [
        "test"
      ],
      "as": "test-const"
    },
    {
      "type": "constant",
      "value": 42,
      "as": "cond-test-const"
    }
  ],
  "content": {
    "element": "prefix_raw-html",
    "ref": "html-ref",
    "content": "<h1>Guthrie</h1>",
    "children": [
      {
        "element": "prefix_for",
        "count": 5,
        "iterator": {
          "children": [
            {
              "element": "prefix_raw-html",
              "content": "<p>Müsste 5 mal hier sein</p>"
            }
          ]
        }
      },
      {
        "element": "prefix_operation",
        "operation": {
          "name": "add",
          "args": [
            "cond-test-const",
            12
          ]
        }
      },
      {
        "element": "prefix_variable",
        "name": "dataSource.test-const",
        "access": "[0]"
      },
      {
        "element": "prefix_conditional",
        "if": {
          "condition": "dataSource.cond-test-const",
          "children": [
            {
              "element": "prefix_raw-html",
              "content": "<h2>cond-test-const is true</h2>"
            }
          ]
        }
      },
      {
        "element": "prefix_conditional",
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
              "element": "prefix_raw-html",
              "content": "<h2>42 is less</h2>"
            }
          ]
        }
      },
      {
        "element": "prefix_operation",
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
        "element": "prefix_switch",
        "condition": "dataSource.cond-test-const",
        "cases": {
          41: {
            "children": [
              {
                "element": "prefix_raw-html",
                "content": "<h2>case1</h2>"
              }
            ]
          },
          42: {
            "children": [
              {
                "element": "prefix_raw-html",
                "content": "<h2>case2</h2>"
              }
            ]
          },
          43: {
            "children": [
              {
                "element": "prefix_raw-html",
                "content": "<h2>case3</h2>"
              }
            ]
          },
        },
        "default": {
          "children": [
            {
              "element": "prefix_raw-html",
              "content": "<h2>default case</h2>"
            }
          ]
        }
      },
      {
        "element": "prefix_conditional",
        "if": {
          "condition": true,
          "children": [
            {
              "element": "prefix_raw-html",
              "content": "<h2>Govan</h2>"
            }
          ]
        },
        "elseIf": [
          {
            "condition": false,
            "children": [
              {
                "element": "prefix_raw-html",
                "content": "<h2>(aufjedenfall)</h2>"
              }
            ]
          },
          {
            "condition": false,
            "children": [
              {
                "element": "prefix_raw-html",
                "content": "<h2>(nicht aufjedenfall)</h2>"
              }
            ]
          }
        ],
        "else": {
          "children": [
            {
              "element": "prefix_raw-html",
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
      elements={
        withElements({
          options: {
            mapNames: (value) => `prefix_${value}`
          }
        })
      }
      operators={
        withOperators({
          options: {
            universal: true
          }
        })
      }
      fns={
        withFns({
          fns: {
            "log": console.log
          },
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
