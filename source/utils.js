var _ = require('lodash');

module.exports = {

    /**
     * Checks the HTTP response code and returns the according error message.
     *
     * See: <http://api.developer.lifx.com/docs/errors>
     *
     * @param {object} response
     * @param {string} body
     * @returns {string}
     */
    checkForErrors: function(response, body) {
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
    },

    /**
     * Checks the light selector if it's valid.
     *
     * See: <http://api.developer.lifx.com/docs/selectors>
     *
     * @param {string} selector
     * @returns {boolean}
     */
    verifySelector: function(selector) {
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
    }
};
