import BasicColorCriteria from '../../src/criteria/basic-color-critieria';

describe('basic color criteria', () => {
    it('should allow chaining', () => {
        const criteria = new BasicColorCriteria();
        expect( criteria.setName('green') instanceof BasicColorCriteria).toBe(true);
    })

    it('should return a valid color name', () => {
        const criteria = new BasicColorCriteria();

        expect(
            criteria.setName('green').getColor()
        ).toBe('green');

        expect(() => {
            criteria.setName('limegreen').getColor()
        }).toThrow();

        expect(() => {
            criteria.setName('').getColor();
        }).toThrow();
    })

    it('should return valid rgb values', () => {
        const criteria = new BasicColorCriteria();
        expect(
            criteria.setRgb(0, 0, 0).getColor()
        ).toBe('rgb:0,0,0');

        expect(
            criteria.setRgb(255, 0, 0).getColor()
        ).toBe('rgb:255,0,0');

        expect(
            criteria.setRgb(0, 255, 0).getColor()
        ).toBe('rgb:0,255,0');

        expect(
            criteria.setRgb(0, 0, 255).getColor()
        ).toBe('rgb:0,0,255');
        
        expect(
            criteria.setRgb(255, 255, 255).getColor()
        ).toBe('rgb:255,255,255');

        expect(() => {
            criteria.setRgb(265, 0, 0).getColor()
        }).toThrow();

        expect(() => {
            criteria.setRgb(0, -1, 0).getColor()
        }).toThrow();

        expect(() => {
            criteria.setRgb(0, 0, 500).getColor()
        }).toThrow();
    });

    it('should return valid hex values', () => {
        const criteria = new BasicColorCriteria();
        
        expect(
            criteria.setHex('#fff000').getColor()
        ).toBe('#FFF000');

        expect(
            criteria.setHex('#000FFF').getColor()
        ).toBe('#000FFF');

        expect(() => {
            criteria.setHex('#fff').getColor();
        }).toThrow();

        expect(() => {
            criteria.setHex('fff000').getColor();
        }).toThrow();

        expect(() => {
            criteria.setHex('#ghijkl').getColor();
        }).toThrow();
    });
});