import { LifxMultiStatesResult } from "../src/@types/lifx";

const states: LifxMultiStatesResult = {
    "results": [
      {
        "operation": {
          "selector": "[selector 1]",
          "power": "on",
          "duration": 5.0
        },
        "results": [
          {
            "id": "dxxxxxxxxxx",
            "label": "Light 1",
            "status": "ok"
          },
          {
            "id": "dxxxxxxxxxx",
            "label": "Light 2",
            "status": "ok"
          }
        ]
      },
      {
        "operation": {
          "selector": "[selector 2]",
          "brightness": 0.5,
          "duration": 5.0
        },
        "error": "not found"
      }
    ]
};

export default states;