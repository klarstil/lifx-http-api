import AdvancedColorCriteria from '../../src/criteria/advanced-color-crtieria';

describe('advanced color criteria', () => {
    it('should allow chaining', () => {
        const criteria = new AdvancedColorCriteria();
        expect(criteria.setHue(0) instanceof AdvancedColorCriteria).toBe(true);
    });
    
    it('should accept valid hue values', () => {
        const criteria = new AdvancedColorCriteria();
        
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
        const criteria = new AdvancedColorCriteria();
        
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
        const criteria = new AdvancedColorCriteria();
        
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
        const criteria = new AdvancedColorCriteria();
        
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
        const criteria = new AdvancedColorCriteria();
    
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
        const criteria = new AdvancedColorCriteria();
        expect(criteria.getColor()).toBe(null);
    })
})