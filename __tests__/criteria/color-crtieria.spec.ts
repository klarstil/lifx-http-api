import ColorCriteria from '../../src/criteria/color-criteria';

describe('color criteria', () => {
    it('should allow chaining', () => {
        const criteria = new ColorCriteria();
        expect(criteria.setHue(0) instanceof ColorCriteria).toBe(true);
    });
    
    it('should accept valid hue values', () => {
        const criteria = new ColorCriteria();
        
        criteria.setHue(0);
        expect(criteria.hue).toBe(0);
        expect(criteria.getColor()).toBe('hue:0');
    
        criteria.setHue(20);
        expect(criteria.hue).toBe(20);
        expect(criteria.getColor()).toBe('hue:20');
    
        expect(() => {
            criteria.setHue(-1);
        }).toThrow();
    
        expect(() => {
            criteria.setHue(361);
        }).toThrow();
    });
    
    it('should accept valid saturation values', () => {
        const criteria = new ColorCriteria();
        
        criteria.setSaturation(0);
        expect(criteria.saturation).toBe(0);
        expect(criteria.getColor()).toBe('saturation:0');
    
        criteria.setSaturation(20);
        expect(criteria.saturation).toBe(0.2);
        expect(criteria.getColor()).toBe('saturation:0.2');
    
        expect(() => {
            criteria.setSaturation(-1);
        }).toThrow();
    
        expect(() => {
            criteria.setSaturation(101);
        }).toThrow();
    });
    
    it('should accept valid brightness values', () => {
        const criteria = new ColorCriteria();
        
        criteria.setBrightness(0);
        expect(criteria.brightness).toBe(0);
        expect(criteria.getColor()).toBe('brightness:0');
    
        criteria.setBrightness(20);
        expect(criteria.brightness).toBe(0.2);
        expect(criteria.getColor()).toBe('brightness:0.2');
    
        expect(() => {
            criteria.setBrightness(-1);
        }).toThrow();
    
        expect(() => {
            criteria.setBrightness(101);
        }).toThrow();
    });
    
    it('should accept valid kelvin values', () => {
        const criteria = new ColorCriteria();
        
        criteria.setKelvin(1500);
        expect(criteria.kelvin).toBe(1500);
        expect(criteria.getColor()).toBe('kelvin:1500');
    
        criteria.setKelvin(9000);
        expect(criteria.kelvin).toBe(9000);
        expect(criteria.getColor()).toBe('kelvin:9000');
    
        expect(() => {
            criteria.setKelvin(0);
        }).toThrow();
    
        expect(() => {
            criteria.setKelvin(10000);
        }).toThrow();
    });
    
    it('should combine hue, saturation and kelvin values', () => {
        const criteria = new ColorCriteria();
    
        criteria.setHue(20);
        expect(criteria.hue).toBe(20);
    
        criteria.setBrightness(20);
        expect(criteria.brightness).toBe(0.2);
    
        criteria.setSaturation(20);
        expect(criteria.saturation).toBe(0.2);
        
        criteria.setKelvin(1500);
        expect(criteria.kelvin).toBe(1500);
        
        expect(criteria.getColor()).toBe('kelvin:1500 brightness:0.2 saturation:0.2 hue:20');
    });
    
    it('should return null if no color property is provided', () => {
        const criteria = new ColorCriteria();
        expect(criteria.getColor()).toBe(null);
    });

    it('should allow chaining', () => {
        const criteria = new ColorCriteria();
        expect( criteria.setName('green') instanceof ColorCriteria).toBe(true);
    })

    it('should return a valid color name', () => {
        const criteria = new ColorCriteria();

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
        const criteria = new ColorCriteria();
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
        const criteria = new ColorCriteria();
        
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
})