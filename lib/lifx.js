var request = require('request'),
    _ = require('lodash'),
    Q = require('q');

/**
 *
 * Sets up the lifx http api client.
 *
 * @param settings
 * @returns {Client}
 * @constructor
 */
function Client(settings) {
    var defaults = {
        version: 'v1',
        url: 'https://api.lifx.com/',
        bearerToken: null
    };
    settings = settings || {};

    if(!settings.hasOwnProperty('bearerToken') || !settings.bearerToken.length) {
        throw new Error('Authentication token is required to use the API.');
    }

    this.settings = _.merge(defaults, settings);

    return this;
}

/**
 * Checks the HTTP response code and returns the according error message.
 *
 * See: <http://api.developer.lifx.com/docs/errors>
 *
 * @param {object} response
 * @param {string} body
 * @returns {string}
 */
var checkForErrors = function(response, body) {
    var responseCodes = [
        { codes: 400, message: 'Request was invalid.' },
        { codes: 401, message: 'Bad access token.' },
        { codes: 403, message: 'Bad OAuth scope.' },
        { codes: 404, message: 'Selector did not match any lights.' },
        { codes: 422, message: 'Missing or malformed parameters' },
        { codes: 426, message: 'HTTP was used to make the request instead of HTTPS. Repeat the request using HTTPS instead.' },
        { codes: 429, message: 'The request exceeded a rate limit.' },
        { codes: [ 500, 502, 503, 523 ], message: 'Something went wrong on Lif\'s end.' }
    ];

    var error = '';
    responseCodes.every(function(responseCode) {
        if(_.isArray(responseCode.codes)) {
            responseCode.codes.forEach(function(code) {
                if (code === response.statusCode) {
                    error = responseCode.message;
                    return false;
                }

                return true;
            });
        }
    });

    // Special case HTTP code 422 Unprocessable Entity
    if(response.statusCode === 422) {
        error = body.error;
    }

    return error;
};

/**
 * Checks the light selector if it's valid.
 *
 * See: <http://api.developer.lifx.com/docs/selectors>
 *
 * @param {string} selector
 * @returns {boolean}
 */
var verifySelector = function(selector) {
    var validSelectors = [
        'all',
        'label:',
        'id:',
        'group_id:',
        'group:',
        'location_id:',
        'location:',
        'scene_id:'
    ], isValid = false;

    if(!selector || !selector.length) {
        return false;
    }

    validSelectors.every(function(sel) {
        if(selector.startsWith(sel)) {
            isValid = true;

            return false;
        }

        return true;
    });

    return isValid;
};

/**
 * Returns the api version.
 *
 * @returns {string}
 */
Client.prototype.getVersion = function() {
    return this.settings.version;
};

/**
 * Sets the api version.
 *
 * @param {string} version
 * @returns {boolean}
 */
Client.prototype.setVersion = function(version) {
    if(!version || !version.length) {
        return false;
    }

    this.settings.version = version;

    return true;
};

/**
 * Returns the api url.
 *
 * @returns {string}
 */
Client.prototype.getUrl = function() {
    return this.settings.url;
};

/**
 * Sets the api url.
 *
 * @param {string} url
 * @returns {boolean}
 */
Client.prototype.setUrl = function(url) {
    if(!url || !url.length) {
        return false;
    }
    this.settings.url = url;

    return true;
};

/**
 * Returns the full api url
 * @returns {string}
 */
Client.prototype.getApiUrl = function() {
    return [ this.settings.url, this.settings.version ].join('');
};

/**
 * Returns the bearer token which is used to authenticate against the api.
 * @returns {null|string}
 */
Client.prototype.getBearerToken = function() {
    return this.settings.bearerToken;
};

/**
 * Sets the bearer token
 *
 * @param {string} token
 * @returns {boolean}
 */
Client.prototype.setBearerToken = function(token) {
    if(!token || !token.length) {
        return false;
    }
    this.settings.token = token;

    return true;
};

/**
 * Returns the client configuration
 *
 * @returns {object}
 */
Client.prototype.getSettings = function() {
    return this.settings;
};

/**
 * Sends the actual request to the lifx api end point.
 *
 * @param {object} settings
 * @param {function} cb
 */
Client.prototype.send = function(settings, cb) {
    var defaults = {
        qs: {},
        json: true,
        method: 'GET',
        baseUrl: this.getApiUrl(),
        headers: {
            Authorization: [ 'Bearer', this.getBearerToken() ].join(' ')
        }
    };

    settings = settings || {};
    settings = _.merge(defaults, settings);

    request(settings, function(err, response, body) {
        var errors = checkForErrors(response, body);
        if(err || errors.length) {
            cb(err || errors, null);
            return;
        }
        cb(null, body);
    });
};

/**
 * Lists all lights or specific lights depending on the selector.
 *
 * @param {string} selector
 * @param {function} cb
 * @returns {*} either the promise or nothing
 */
Client.prototype.listLights = function(selector, cb) {
    var deferred = Q.defer();

    selector = selector || 'all';
    if(!verifySelector(selector)) {
        throw new Error('Selector is not valid.');
    }

    this.send({ url: 'lights/' + selector }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
};

/**
 * Lists all available scenes
 *
 * @param {function} cb
 * @returns {*} either the promise or nothing
 */
Client.prototype.listScenes = function(cb) {
    var deferred = Q.defer();

    this.send({ url: 'scenes' }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
};

/**
 * Sets a sets to all or a specific light.
 *
 * @param {string} selector
 * @param {object} settings
 * @param {function} cb
 * @returns {*} either the promise or nothing
 */
Client.prototype.setState = function(selector, settings, cb) {
    var deferred = Q.defer();

    selector = selector || 'all';
    if(!verifySelector(selector)) {
        throw new Error('Selector is not valid.');
    }

    settings = settings || {};
    this.send({
        url: 'lights/' + selector + '/state',
        body: settings,
        method: 'PUT'
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
};

/**
 * Sets multiple states at once.
 *
 * @param {object} settings
 * @param {function} cb
 * @returns {*} either the promise or nothing
 */
Client.prototype.setStates = function(settings, cb) {
    var deferred = Q.defer();

    settings = settings || {};
    if(!settings.hasOwnProperty('states')) {
        throw new Error('"states" is required.')
    }

    this.send({
        url: 'lights/states',
        body: settings,
        method: 'PUT'
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
};

/**
 * Toggles the power status of the light.
 *
 * @param {string} selector
 * @param {string} duration
 * @param {function} cb
 * @returns {*} either the promise or nothing
 */
Client.prototype.togglePower = function(selector, duration, cb) {
    var deferred = Q.defer();

    selector = selector || 'all';
    if(!verifySelector(selector)) {
        throw new Error('Selector is not valid.');
    }

    duration = duration || 0;
    this.send({
        url: 'lights/' + selector + '/toggle',
        body: { duration: duration },
        method: 'POST'
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
};

/**
 * Creates a breathe effect with the matching light bulbs.
 *
 * @param {string} selector
 * @param {object} settings
 * @param {function} cb
 * @returns {*} either the promise or nothing
 */
Client.prototype.breathe = function(selector, settings, cb) {
    var deferred = Q.defer();

    selector = selector || 'all';
    if(!verifySelector(selector)) {
        throw new Error('Selector is not valid.');
    }

    settings = settings || {};
    if(!settings.hasOwnProperty('color')) {
        throw new Error('"color" is required.');
    }

    this.send({
        url: 'lights/' + selector + '/effects/breathe',
        body: settings,
        method: 'POST'
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
};

/**
 * Creates a pulse effect with the matching light bulbs.
 *
 * @param {string} selector
 * @param {object} settings
 * @param {function} cb
 * @returns {*} either the promise or nothing
 */
Client.prototype.pulse = function(selector, settings, cb) {
    var deferred = Q.defer();

    selector = selector || 'all';
    if(!verifySelector(selector)) {
        throw new Error('Selector is not valid.');
    }

    settings = settings || {};
    if(!settings.hasOwnProperty('color')) {
        throw new Error('"color" is required.');
    }

    this.send({
        url: 'lights/' + selector + '/effects/pulse',
        body: settings,
        method: 'POST'
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
};

/**
 * Cycles through different defined states.
 *
 * @param {string} selector
 * @param {object} settings
 * @param {function} cb
 * @returns {*} either the promise or nothing
 */
Client.prototype.cycle = function(selector, settings, cb) {
    var deferred = Q.defer();

    selector = selector || 'all';
    if(!verifySelector(selector)) {
        throw new Error('Selector is not valid.');
    }

    settings = settings || {};
    if(!settings.hasOwnProperty('states')) {
        throw new Error('"states" is required.');
    }

    this.send({
        url: 'lights/' + selector + '/cycle',
        body: settings,
        method: 'POST'
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
};

/**
 * Activates the specific scene to the specific light bulbs.
 *
 * @param {string} selector
 * @param {string} duration
 * @param {function} cb
 * @returns {*} either the promise or nothing
 */
Client.prototype.activateScene = function(selector, duration, cb) {
    var deferred = Q.defer();

    selector = selector || 'all';
    if(!verifySelector(selector)) {
        throw new Error('Selector is not valid.');
    }

    duration = duration || 0;
    this.send({
        url: 'lights/' + selector + '/cycle',
        body: { duration: duration },
        method: 'PUT'
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
};

Client.prototype.validateColor = function(color, cb) {
    var deferred = Q.defer();

    color = color || '';
    if(!color.length) {
        throw new Error('"color" is required.');
    }

    this.send({
        url: 'color',
        qs: { color: color },
        method: 'PUT'
    }, function(err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise.nodeify(cb);
};

module.exports = Client;