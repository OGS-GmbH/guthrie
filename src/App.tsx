import {Stage} from "./stage.tsx";

function App() {

  return <Stage components={{}} page={{
      "route": "/example",
      "content": {
          "element": "html",
          "ref": "html-ref",
          "content": "<h1>Guthrie</h1>",
          "children": [{
              "element": "for",
              "count": 7,
              "children": [{
                  "element": "html",
                  "content": "render mich x mal"
              }]
          }, {
              "element": "if",
              "ref": "if-ref",
              "condition": true,
              "children": [{
                  "element": "html",
                  "content": "<h2>Govan</h2>"
              }]
          },/*{
              "element": "else",
              "ifRef": "if-ref",
              "children": [{
                  "element": "html",
                  "content": "<h2>Best guitarist ever</h2>"
              }]
          }*/]
      }
  }}/>
}

export default App
