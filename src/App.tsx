import { Guthrie } from "./renderer/root"
import { withElements, withFns } from "./options/config"

const page = {
  "route": "/example",
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
    "element": "prefix_raw-html",
    "ref": "html-ref",
    "content": "<h1>Guthrie</h1>",
    "children": [
      {
        "element": "operation",
        "args": {
          "name": "add",
          "args": [
            {
              "name": "mul",
              "args": ["gehaltsliste.simonkovtyk", "2"]
            },
            {
              "name": "mul",
              "args": ["gehaltsliste.simonkovtyk", "2"]
            }
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
}

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
