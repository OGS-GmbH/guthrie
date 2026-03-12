import { Guthrie } from "./renderer/root"
import { withElements, withFns, withOperators } from "./options/config"
import type { Page } from "./renderer/type"

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
      }, {
        "name": "addEvents",
        "args": [
          "dblclick",
          "target",
          {
            "type": "arg",
            "name": "log",
            "args": ["log mich am ..."]
          }
        ]
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
    "element": "prefix_div",
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
    "children": [{
      "element": "prefix_fn-renderer",
      "args": [{type: "arg", "element": "prefix_text", "content": "coult be async"}]
    },
      {
        "element": "prefix_raw-html",
        "content": "<h2>Guthrie</h2>"
      },
      {
        "element": "prefix_p",
        "children": [
          {
            "element": "prefix_text",
            "content": "Hallo Guthrie"
          }
        ]
      },
      {
        "element": "prefix_for",
        "count": 5,
        "iterator": {
          "children": [
            {
              "element": "prefix_p",
              "children": [
                {
                  "element": "prefix_text",
                  "content": "Hallo Guthrie 5x"
                }
              ]
            }
          ]
        }
      },
      {
        "element": "prefix_operation",
        "operation": {
          "name": "add",
          "args": [
            "dataSource.cond-test-const",
            12
          ]
        }
      },
      {
        "element": "prefix_variable",
        "name": "gehaltsliste",
        "access": "[0].salary"
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
