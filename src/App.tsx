import {Guthrie} from "./renderer/root"
import {withElements, withFns, withOperators} from "./options/config"
import type {ExposableEvent, ExposableFn} from "./renderer/type"
import {examplePage} from "./example.ts";

const testEvent: ExposableEvent = {
  name: "click",
  as: "test-listener",
  actions: [
    {
      name: "log",
      args: [{
        type: "event",
        access: [{
          type: "property",
          read: "clientX"
        }]
      }]
    }
  ]
}

const testAction: ExposableFn = {
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

const testForElement = {
  "element": "prefix_for",
  "count": 1,
  "iterator": {
    "children": [
      {
        "element": "prefix_p",
        "children": [
          {
            "element": "prefix_text",
            "content": "Hallo Guthrie 1x"
          }
        ]
      }
    ]
  }
}

const testAddOperation = {
  "element": "prefix_operation",
  "operation": {
    "name": "add",
    "args": [
      1,
      4
    ]
  }
};

const testSwitch = {
  "element": "prefix_switch",
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
      read: "id"
    }]
  },
  "cases": {
    1: {
      "children": [
        {
          "element": "prefix_raw-html",
          "content": "<h2>case1</h2>"
        }
      ]
    },
    "delectus aut autem": {
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
};
let testFnElement = {
  element: "prefix_fn",
  name: "test",
  args: [4, 1],
  as: "miesertest"
};
let testFnRenderer = {
  element: "prefix_fn-renderer",
  name: "test",
  args: [2, 2],
  access: [{
    type: "property",
    read: "result"
  }]
};
const page = {
  "route": "/example",
  "events": [
    testEvent
  ],
  "onInit": [
    testAction
  ],
  "content": {
    "element": "prefix_div",
    "ref": "html-ref",
    "events": [
      {
        "name": "click",
        "actions": [
          {
            "name": "removeListener",
            "args": ["window", "click"]
          }
        ]
      }
    ],
    "children": [{
      element: "test",
      events: [testEvent],
      ref: "test-ref",
      properties: {
        unknownProp: {
          type: "quatsch",
          value: ""
        },
        otherUnknownProp: {
          type: "variable",
          name: "someName"
        }
      }
    },{
      element: "prefix_input",
      value: {
        //type: "native",
        //value: "test"
        type: "variable",
        name: "varName",
        access: [{
          type: "property",
          read: "test"
        }],
      }
    },
      //testFnElement,
     // testFnRenderer,
      {
        "element": "prefix_raw-html",
        "content": {type: "native", value: "<h2>Guthrie</h2>"}
      },
      {
        "element": "prefix_p",
        "children": [
          {
            "element": "prefix_text",
            "content": "Hallo Guthrie"
          },{
            "element": "prefix_variable",
            "name": "miesertest",
            "access": [{
              type: "property",
              read: "result"
            }]
          },
        ]
      },
      //testForElement,
      //testAddOperation,
      {
        "element": "prefix_variable",
        "name": "gehaltsliste",
        "access": [{
          type: "prototype",
          read: "clone"
        }, {
          type: "prototype",
          read: "json"
        }, {
          type: "property",
          read: "id"
        }]
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
      /*{
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
      },*/
      testSwitch,
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
} /*satisfies Page*/;

function App() {
  return (
    <Guthrie
      elements={
        withElements({
          options: {
            mapNames: (value) => value
          }
        })
      }
      operators={
        withOperators({
          options: {
            universal: true,
            universalNames: "guthrie"
          }
        })
      }
      fns={
        withFns({
          fns: {test: (a, b) => ({result: a - b})},
          options: {
            native: true
          }
        })
      }
      page={examplePage}
    />
  )
}

export default App
