import { LifxApiDevice } from "../src/@types/lifx";

const lights: LifxApiDevice[] = [{
    "id": "d073d5141876",
    "uuid": "02a5b510-2d3d-46ea-92ac-c4533f75c24e",
    "label": "Lamp",
    "connected": true,
    "power": "on",
    "color": {
        "hue": 59.997253376058595,
        "saturation": 1,
        "kelvin": 3500
    },
    "brightness": 0.29999237048905164,
    "effect": "OFF",
    "group": {
        "id": "06e3ec50395511e9a0757200055bf1c0",
        "name": "Loungeroom"
    },
    "location": {
        "id": "f2c1aa82395411e9a0757200055bf1c0",
        "name": "Home"
    },
    "product": {
        "name": "Color 1000",
        "identifier": "lifx_color_a19",
        "company": "LIFX",
        "capabilities": {
            "has_color": true,
            "has_variable_color_temp": true,
            "has_ir": false,
            "has_chain": false,
            "has_multizone": false,
            "min_kelvin": 2500,
            "max_kelvin": 9000
        }
    },
    "last_seen": "2019-02-25T23:40:40Z",
    "seconds_since_seen": 0
}, {
    "id": "d073d528d80f",
    "uuid": "021e0518-e5bc-4432-a42a-73f4a7d0ddbd",
    "label": "MyZ",
    "connected": true,
    "power": "on",
    "color": {
        "hue": 0,
        "saturation": 1,
        "kelvin": 3500
    },
    "brightness": 0.29999237048905164,
    "zones": {
        "count": 8,
        "zones": [
            {
                "brightness": 0.3,
                "hue": 0,
                "kelvin": 3500,
                "saturation": 1,
                "zone": 0
            },
            {
                "brightness": 0.3,
                "hue": 60,
                "kelvin": 3500,
                "saturation": 1,
                "zone": 1
            },
            {
                "brightness": 0.3,
                "hue": 40,
                "kelvin": 3500,
                "saturation": 1,
                "zone": 2
            },
            {
                "brightness": 0.3,
                "hue": 127,
                "kelvin": 3500,
                "saturation": 1,
                "zone": 3
            },
            {
                "brightness": 0.3,
                "hue": 294,
                "kelvin": 3500,
                "saturation": 1,
                "zone": 4
            },
            {
                "brightness": 0.3,
                "hue": 238.99,
                "kelvin": 3500,
                "saturation": 1,
                "zone": 5
            },
            {
                "brightness": 0.3,
                "hue": 271,
                "kelvin": 3500,
                "saturation": 1,
                "zone": 6
            },
            {
                "brightness": 0.3,
                "hue": 271,
                "kelvin": 3500,
                "saturation": 1,
                "zone": 7
            }
        ]
    },
    "effect": "OFF",
    "group": {
        "id": "f2b54076395411e9a0757200055bf1c0",
        "name": "Kitchen"
    },
    "location": {
        "id": "f2c1aa82395411e9a0757200055bf1c0",
        "name": "Home"
    },
    "product": {
        "name": "LIFX Z",
        "identifier": "lifx_z2",
        "company": "LIFX",
        "capabilities": {
            "has_color": true,
            "has_variable_color_temp": true,
            "has_ir": false,
            "has_chain": false,
            "has_multizone": true,
            "min_kelvin": 2500,
            "max_kelvin": 9000
        }
    },
    "last_seen": "2019-02-25T23:40:56Z",
    "seconds_since_seen": 0
}, {
    "id": "d073d5fb93d8",
    "uuid": "02507649-8240-4b67-8cee-4def40e5989e",
    "label": "MyTile",
    "connected": true,
    "power": "on",
    "color": {
        "hue": 38.83726253147174,
        "saturation": 1,
        "kelvin": 3500
    },
    "brightness": 0.09999237048905166,
    "effect": "OFF",
    "chain": {
        "count": 2,
        "children": [
            {
                "height": 8,
                "index": 0,
                "user_x": 0,
                "user_y": 0,
                "width": 8
            },
            {
                "height": 8,
                "index": 1,
                "user_x": 1,
                "user_y": 0,
                "width": 8
            }
        ]
    },
    "group": {
        "id": "f2b54076395411e9a0757200055bf1c0",
        "name": "Kitchen"
    },
    "location": {
        "id": "f2c1aa82395411e9a0757200055bf1c0",
        "name": "Home"
    },
    "product": {
        "name": "LIFX Tile",
        "identifier": "lifx_tile",
        "company": "LIFX",
        "capabilities": {
            "has_color": true,
            "has_variable_color_temp": true,
            "has_ir": false,
            "has_chain": true,
            "has_multizone": false,
            "min_kelvin": 2500,
            "max_kelvin": 9000
        }
    },
    "last_seen": "2019-02-25T23:41:19Z",
    "seconds_since_seen": 0
}];

export default lights;