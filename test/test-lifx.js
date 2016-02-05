'use strict';

var chai = require('chai'),
    fs = require('fs'),
    chaiHttp = require('chai-http'),
    lifx = require('../dist/lifx'),
    expect = chai.expect,
    client, token;

chai.use(chaiHttp);

describe('Lifx HTTP API wrapper', function() {
    beforeEach(function() {
        token = fs.readFileSync(__dirname + '/../bearer-token.txt', 'utf8');
    });

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
});
