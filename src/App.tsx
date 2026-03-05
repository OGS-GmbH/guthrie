import {Stage} from "./stage.tsx";

const page = {
  "route": "/example",
  "content": {
    "element": "html",
    "ref": "html-ref",
    "content": "<h1>Guthrie</h1>",
    "children": [
      {
        "element": "if",
        "ref": "if-ref",
        "condition": true,
        "children": [
          {
            "element": "html",
            "content": "<h2>Govan</h2>"
          }
        ]
      }, {
        "element": "else-if",
        "ifRef": "if-ref",
        "condition": false,
        "children": [
          {
            "element": "html",
            "content": "<h2>(aufjedenfall)</h2>"
          }
        ]
      }, {
        "element": "else",
        "ifRef": "if-ref",
        "children": [
          {
            "element": "html",
            "content": "<h2>Best guitarist ever</h2>"
          }
        ]
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
