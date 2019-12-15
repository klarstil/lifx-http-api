import httpClient from '../../src/service/http-client';

describe('http client', () => {
    it('should throw an error when no bearer token was provided', () => {
        expect(() => {
            httpClient('');
        }).toThrow();
    });

    it('should return a http client instance', () => {
        expect(typeof httpClient('bearer-token')).toBe('function');
    });
});