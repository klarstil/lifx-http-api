import * as library from '../src/index';
import SelectorCriteria from '../src/criteria/selector-criteria';

describe('library index', () => {
    it('should export the necessary library parts', () => {
        const lib = library.default;
        expect(lib.hasOwnProperty('SelectorCriteria')).toBe(true);
        expect(lib.hasOwnProperty('ColorCriteria')).toBe(true);
        expect(lib.hasOwnProperty('LifxFactory')).toBe(true);
        expect(lib.hasOwnProperty('HttpClient')).toBe(true);
    })
})