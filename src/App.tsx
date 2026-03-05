import {Stage} from "./stage.tsx";

const page = {
  "route": "/example",
  "content": {
    "element": "raw-html",
    "ref": "html-ref",
    "content": "<h1>Guthrie</h1>",
    "children": [
      {
        "element": "switch",
        "condition": "case3",
        "cases": {
          "case1": {
            "children": [
              {
                "element": "raw-html",
                "content": "<h2>case1</h2>"
              }
            ]
          },
          "case2": {
            "children": [
              {
                "element": "raw-html",
                "content": "<h2>case2</h2>"
              }
            ]
          },
          "case3": {
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
}

function App() {
  return (
    <Stage
      components={{}}
      page={page}
    />
  )
}

export default App
