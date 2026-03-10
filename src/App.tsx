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
    }
  ],
  "content": {
    "element": "prefix_div",
    "ref": "html-ref",
    "content": "<h1>Guthrie</h1>",
    "events": [{
      "type": "mouseenter",
      "as": "mouse-enter-listener",
      "actions": [{
        "fn": "log",
        "args": ["mouse enter"]
      }]
    }],
    "children": [
      {
        "element": "prefix_operation",
        "operation": {
          "name": "exp",
          "args": [
            2,
            8
          ]
        }
      },
      {
        "element": "prefix_switch",
        "condition": "case3",
        "cases": {
          "case1": {
            "children": [
              {
                "element": "prefix_raw-html",
                "content": "<h2>case1</h2>"
              }
            ]
          },
          "case2": {
            "children": [
              {
                "element": "prefix_raw-html",
                "content": "<h2>case2</h2>"
              }
            ]
          },
          "case3": {
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
