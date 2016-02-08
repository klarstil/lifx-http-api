'use strict';

var chai = require('chai'),
    fs = require('fs'),
    chaiHttp = require('chai-http'),
    lifx = require('../dist/lifx'),
    utils = require('../dist/utils'),
    expect = chai.expect,
    client, token,
    process = require('process');

chai.use(chaiHttp);

if (process.env.BEARER_TOKEN) {
    token = process.env.BEARER_TOKEN;
} else {
    token = fs.readFileSync(__dirname + '/../bearer-token.txt', 'utf8');
}

describe('Lifx HTTP API wrapper', function() {
    describe('Client initialization', function() {
        it('should create a client with a token', function() {
            client = new lifx({
                bearerToken: token
            });

            expect(client).to.be.an.instanceof(lifx);
        });

        it('should not create a client without a token', function() {
            expect(function() {
                client = new lifx();
            }).to.throw(Error);
        });

        it('should create a client with a custom config', function() {
            var opts = {
                bearerToken: token,
                version: 'v1beta',
                url: 'http://google'
            };
            client = new lifx(opts);

            expect(client.settings.version).to.equal(opts.version);
            expect(client.settings.url).to.equal(opts.url);
            expect(client.settings.bearerToken).to.equal(opts.bearerToken);
        });

        it('should be possible to set & get a version', function() {
            var data = 'someVersion';

            client = new lifx({
                bearerToken: token
            });

            expect(client.setVersion(data)).to.be.true;
            expect(client.getVersion()).to.equal(data);
        });

        it('should be possible to set a url', function() {
            var data = 'someUrl';

            client = new lifx({
                bearerToken: token
            });

            expect(client.setUrl(data)).to.be.true;
            expect(client.getUrl()).to.equal(data);
        });

        it('should be possible to set & get a bearer token', function() {
            var data = 'ashiodhsaio3122asad3123d';

            client = new lifx({
                bearerToken: token
            });

            expect(client.setBearerToken(data)).to.be.true;
            expect(client.getBearerToken()).to.equal(data);
        });

        it('should be possible to get the api url', function() {
            client = new lifx({
                bearerToken: token
            });

            expect(client.getApiUrl()).to.equal('https://api.lifx.com/v1');
        });

        it('should be possible to get the client settings', function() {
            var opts = {
                bearerToken: 'token',
                version: 'v1beta',
                url: 'http://google'
            };

            client = new lifx(opts);

            expect(client.getSettings()).to.have.keys([ 'bearerToken', 'version', 'url' ]);
        });
    });

    describe('Utils tests', function() {
        it('should validate selectors', function() {

            expect(utils.verifySelector('all')).to.be.true;
            expect(utils.verifySelector('label:test')).to.be.true;
            expect(utils.verifySelector('label:test test')).to.be.true;
            expect(utils.verifySelector('group_id:asd3212easdx')).to.be.true;
            expect(utils.verifySelector('group:test')).to.be.true;
            expect(utils.verifySelector('group:test test')).to.be.true;
            expect(utils.verifySelector('location_id:asd3212easdx')).to.be.true;
            expect(utils.verifySelector('location:test')).to.be.true;
            expect(utils.verifySelector('location:test test')).to.be.true;
            expect(utils.verifySelector('scene_id:asd3212easdx')).to.be.true;

            expect(utils.verifySelector('test')).to.be.false;
            expect(utils.verifySelector('test:label')).to.be.false;
        })
    });

    describe('Client integration', function() {
        it('should get all available lights', function() {
            client = new lifx({
                bearerToken: token
            });

            expect(function() {
                client.listLights('testing');
            }).to.throw(Error);

            client.listLights('all').then(function(data) {
                var light = data[0];

                expect(light).to.have.keys([
                    'id', 'uuid', 'label', 'connected', 'power', 'color', 'brightness', 'group', 'location',
                    'last_seen', 'seconds_since_seen', 'product'
                ]);
            });
        });

        it('should get all available scenes', function() {
            client = new lifx({
                bearerToken: token
            });

            client.listScenes().then(function(data) {
                var scene = data[0];

                expect(scene).to.have.keys([
                    'uuid', 'name', 'account', 'states', 'created_at', 'updated_at'
                ]);
            });
        });

        it('should validate a color', function() {
            client = new lifx({
                bearerToken: token
            });

            client.validateColor('#ff000f').then(function(data) {
                expect(data).to.have.keys([
                    'hue', 'saturation', 'brightness', 'kelvin'
                ]);
            });
        });

        it('should toggle the power state', function() {
            client = new lifx({
                bearerToken: token
            });

            client.togglePower('all').then(function(data) {
                expect(data.result).to.be.instanceof(Array);

                var result = data.result[0];

                expect(result).to.have.keys([
                    'id', 'label', 'status'
                ]);
            });
        });

        it('should set the state', function() {
            client = new lifx({
                bearerToken: token
            });

            client.setState('all', {
                power: 'on'
            }).then(function(data) {
                expect(data.result).to.be.instanceof(Array);

                var result = data.result[0];

                expect(result).to.have.keys([
                    'id', 'label', 'status'
                ]);
            });
        });
    });
});
