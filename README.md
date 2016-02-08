# Lifx HTTP Api Node.js Wrapper

[![NPM Version](https://img.shields.io/npm/v/lifx-http-api.svg)](https://www.npmjs.com/package/lifx-http-api) ![Dependency Status](https://david-dm.org/klarstil/lifx-http-api.svg) [![Build Status](https://travis-ci.org/klarstil/lifx-http-api.svg?branch=master)](https://travis-ci.org/klarstil/lifx-http-api) [![License MIT](https://img.shields.io/badge/license-mit-brightgreen.svg)](https://github.com/klarstil/lifx-http-api/blob/master/LICENSE)

A thin Node.js API wrapper of the [Lifx HTTP protocol](http://api.developer.lifx.com/).

This library is not, in any way, affiliated or related to Lifi Labs, Inc.. Use at your own risk.

## Installation

```sh
$ npm install lifx-http-api --save
```

## Compatibility

Node.js 4.2.6+ is tested and supported on Mac, Linux and Windows.

## Bearer Token

A bearer token is mandatory to use the API. A new token can be obtain in the [Lifx Cloud Settings](https://cloud.lifx.com/).

## Usage

The thin API wrapper uses a client for network communication. This client handles all requests against the Lifx API.

```js
var lifx = require('lifx-http-api'),
    client;
    
client = new lifx({
    bearerToken: '<your api token>'
});
```

The `Client` object provides promises by the great [Q library](https://github.com/kriskowal/q). You can either use callbacks or promises.

```js
// Using callbacks
client.listLights('all', function(err, data) {
    if(err) {
    	console.error(err);
    	return;
    }
    
    console.log(data)
});

// Using promises
client.listLights('all').then(console.log, console.error);
```

### Getting lights and scenes

#### `client.listLights(selector, [cb])`
Gets lights belonging to the authenticated account. Filter the lights using selectors.

Option | Type | Default | Description
------ | ---- | ------- | -----------
`selector` | string | | Selector for the light bulb you want to get. See the [Selector section](http://api.developer.lifx.com/docs/selectors) to get more information.
`cb` | function | null | `function(err, data) {}` Callback function which will be called when the HTTP request to the API was processed.

**Usage example:**
```js
// Using callbacks
client.listLights('all', function(err, data) {
    if(err) {
    	console.error(err);
    	return;
    }
    
    console.log(data)
});

// Using promises
client.listLights('all').then(console.log, console.error);
```

### Modifying light state

#### `client.setState(selector, settings, [cb])`
Sets the state of the lights within the selector.

Option | Type | Default | Description
------ | ---- | ------- | -----------
`selector` | string | | Selector for the light bulb you want to get. See the [Selector section](http://api.developer.lifx.com/docs/selectors) to get more information.
`settings` | object | `{}` | State configuration object. See the [official documentation ](http://api.developer.lifx.com/docs/set-state) for further information.
`cb` | function | null | `function(err, data) {}` Callback function which will be called when the HTTP request to the API was processed.

**Usage example:**
```js
// Using callbacks
client.setState('all', {
	power: 'on',
	color: 'blue saturation:0.5',
	brightness: 0.5,
	duration: 5		
}, function(err, data) {
    if(err) {
    	console.error(err);
    	return;
    }
    
    console.log(data)
});

// Using promises
client.setState('all', {
	power: 'on',
	color: 'blue saturation:0.5',
	brightness: 0.5,
	duration: 5		
}).then(console.log, console.error);
```

#### `client.setStates(settings, [cb])`
This endpoint allows you to set different states on multiple selectors in a single request.

Option | Type | Default | Description
------ | ---- | ------- | -----------
`settings` | Mixed | `{}` | Multiple State configuration object. See the [official documentation ](http://api.developer.lifx.com/docs/set-state) for further information.
`cb` | function | null | `function(err, data) {}` Callback function which will be called when the HTTP request to the API was processed.

**Usage example:**
```js
// Using callbacks
client.setState('all', {
    "states": [ {
        "selector": "all",
        "power": "on"
    }, {
        "selector": "group:test",
        "brightness": 0.5
    } ],
    "defaults": {
        "duration": 5.0
    }
}, function (err, data) {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data)
});
```

#### `client.togglePower(selector, [duration], [cb])`
Turn off lights if they are on, or turn them on if they are off. Physically powered off lights are ignored.

Option | Type | Default | Description
------ | ---- | ------- | -----------
`selector` | string | `all`| Selector for the light bulb you want to get. See the [Selector section](http://api.developer.lifx.com/docs/selectors) to get more information.
`duration` | int | 0 | Turning on or off will be faded over the time (in seconds).
`cb` | function | null | `function(err, data) {}` Callback function which will be called when the HTTP request to the API was processed.

**Usage example:**
```js
// Using callbacks
client.togglePower('all', 1.5, function (err, data) {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data)
});
```

#### `client.breathe(selector, [settings], [cb])`
Performs a breathe effect by slowly fading between the given colors. Use the parameters to tweak the effect.

Option | Type | Default | Description
------ | ---- | ------- | -----------
`selector` | string | `all`| Selector for the light bulb you want to get. See the [Selector section](http://api.developer.lifx.com/docs/selectors) to get more information.
`settings` | Object | `{}` | Breathe effect object, see the [official documentation](http://api.developer.lifx.com/docs/breathe-effect) for all available parameter.
`cb` | function | null | `function(err, data) {}` Callback function which will be called when the HTTP request to the API was processed.

**Usage example:**
```js
// Using callbacks
client.breathe('all', {
    color: '#006633',
    from_color: '#00AF33',
    period: 1,
    cycles: 10,
    persist: true,
    power_on: true,
    peak: 0.8
}, function (err, data) {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data)
});
```

#### `client.pulse(selector, [settings], [cb])`
Performs a pulse effect by quickly flashing between the given colors. Use the parameters to tweak the effect.

Option | Type | Default | Description
------ | ---- | ------- | -----------
`selector` | string | `all`| Selector for the light bulb you want to get. See the [Selector section](http://api.developer.lifx.com/docs/selectors) to get more information.
`settings` | Object | `{}` | Pulse effect object, see the [official documentation](http://api.developer.lifx.com/docs/pulse-effect) for all available parameter.
`cb` | function | null | `function(err, data) {}` Callback function which will be called when the HTTP request to the API was processed.

**Usage example:**
```js
// Using callbacks
client.pulse('all', {
    color: '#006633',
    from_color: '#00AF33',
    period: 1,
    cycles: 10,
    persist: true,
    power_on: true,
    peak: 0.8
}, function (err, data) {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data)
});
```

#### `client.cycle(selector, [settings], [cb])`
Make the light(s) cycle to the next or previous state in a list of states.

Option | Type | Default | Description
------ | ---- | ------- | -----------
`selector` | string | `all`| Selector for the light bulb you want to get. See the [Selector section](http://api.developer.lifx.com/docs/selectors) to get more information.
`settings` | Object | `{}` | Cycle states object, see the [official documentation](http://api.developer.lifx.com/docs/cycle) for all available parameter.
`cb` | function | null | `function(err, data) {}` Callback function which will be called when the HTTP request to the API was processed.

**Usage example:**
```js
// Using callbacks
client.cycle('all', {
    "states": [{
        "brightness": 1.0
    }, {
        "brightness": 0.5
    }, {
        "brightness": 0.1
    }, {
        "power": "off"
    }],
    "defaults": {
        "power": "on", // all states default to on
        "saturation": 0, // every state is white
        "duration": 2.0 // all transitions will be applied over 2 seconds
    }
}, function (err, data) {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data)
});
```

### Working with scenes

#### `client.listScenes([cb])`
Lists all the scenes available in the users account.

Option | Type | Default | Description
------ | ---- | ------- | -----------
`cb` | function | null | `function(err, data) {}` Callback function which will be called when the HTTP request to the API was processed.

**Usage example:**
```js
// Using callbacks
client.listScene(function(err, data) {
    if(err) {
    	console.error(err);
    	return;
    }
    
    console.log(data)
});

// Using promises
client.listScenes().then(console.log, console.error);
```

#### `client.activateScene(selector, [duration], [cb])`
Activates a scene from the users account.

Option | Type | Default | Description
------ | ---- | ------- | -----------
`selector` | string | `all`| Scene selector. See the [Selector section](http://api.developer.lifx.com/docs/selectors) to get more information.
`duration` | int | 0 | Fades to the scene (in seconds).
`cb` | function | null | `function(err, data) {}` Callback function which will be called when the HTTP request to the API was processed.

**Usage example:**
```js
// Using callbacks
client.activateScene('scene_id:d073d501cf2c', 1.2, function (err, data) {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data)
});
```

### Utility methods

#### `client.validateColor(color, [cb])`
This method lets you validate a user's color string and return the hue, saturation, brightness and kelvin values that the API will interpret as.

Option | Type | Default | Description
------ | ---- | ------- | -----------
`color` | string | | Color string you'd like to validate. See the [Color section](http://api.developer.lifx.com/docs/colors) to get more information.
`cb` | function | null | `function(err, data) {}` Callback function which will be called when the HTTP request to the API was processed.

**Usage example:**
```js
// Using callbacks
client.validateColor('#0198E1', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data)
});
```

### Client API

#### `client.getVersion()`
Returns the api version.

**Usage example:**
```js
client.getVersion();  // outputs "v1"
```

#### `client.setVersion(version)`
Sets the api version. Returns `true` if the version was set sucessfully, otherwise `false`.
 
Option | Type | Default | Description
------ | ---- | ------- | -----------
`version` | string | | API version which will be used by the `Client` object.

**Usage example:**
```js
client.setVersion('v2beta');
```

#### `client.getUrl()`
Returns the api url.

**Usage example:**
```js
client.getUrl();  // outputs "https://lifx.com/api/"
```

#### `client.setUrl(url)`
Sets the api url. Returns `true` if the url was set sucessfully, otherwise `false`.
 
Option | Type | Default | Description
------ | ---- | ------- | -----------
`url` | string | | API url which will be used by the `Client` object.

**Usage example:**
```js
client.setUrl('https://my-lifx-api-url.com');
```

#### `client.getApiUrl()`
Returns the full Lifx api endpoint


**Usage example:**
```js
client.getApiUrl(); // outputs "https://lifx.com/api/v1"
```

#### `client.getBearerToken()`
Returns the bearer authentication token.

**Usage example:**
```js
client.getBearerToken();  // outputs "<your-token>"
```

#### `client.setBearerToken(token)`
Sets the bearer authentication token. Returns `true` if the token was set sucessfully, otherwise `false`.
 
Option | Type | Default | Description
------ | ---- | ------- | -----------
`token` | string | | Bearer authentication token which will be used by the `Client` object.

**Usage example:**
```js
client.setBearerToken('<your-token>');
```

#### `client.send(settings, cb)`
Sends a request to the Lifx API.

Option | Type | Default | Description
------ | ---- | ------- | -----------
`settings` | Object | `{}` | `request` configuration settings. See the [offical documentation](https://github.com/request/request) for further information.
`cb` | function | null | `function(err, data) {}` Callback function which will be called when the HTTP request to the API was processed.

**Usage example:**
```js
client.send({
    url: 'lights/all/state',
    body: {
        power: 'on',
        color: 'blue saturation:0.5',
        brightness: 0.5,
        duration: 5        
    },
    method: 'PUT'
}, function(err, data) {
    if (err) console.error(err);
    else console.log(data);
})
```

### Client settings

The `Client` object can be configured at initialization:

```js
var lifx = require('lifx-http-api'),
    client;
    
client = new lifx({
    bearerToken: '<your api token>',	// Authentication token
    version: 'v2beta',					// API version
    url: 'https://api.lifx.com'			// API endpoint
});
```