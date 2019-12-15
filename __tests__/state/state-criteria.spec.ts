import StateCriteria from '../../src/state/state-criteria';
import SelectorCriteria from '../../src/criteria/selector-criteria';
import ColorCriteria from '../../src/criteria/color-criteria';

describe('state criteria', () => {
    it('should allow chaining', () => {
        const selector = (new SelectorCriteria()).setAll();
        const criteria = new StateCriteria(selector);
        expect(criteria.setPower(false) instanceof StateCriteria).toBe(true);
    });

    it('should toggle the power flag', () => {
        const selector = (new SelectorCriteria()).setAll();
        const criteria = new StateCriteria(selector);

        criteria.setPower(true);
        expect(criteria.power).toBe('on');

        criteria.setPower(false);
        expect(criteria.power).toBe('off');

        expect(criteria.getState()).toStrictEqual({
            power: 'off',
            fast: false,
            duration: 1.0
        });
    });

    it('should set the color flag', () => {
        const selector = (new SelectorCriteria()).setAll();
        const criteria = new StateCriteria(selector);
        const color = (new ColorCriteria()).setHex('#fff000');

        criteria.setColor(color);
        expect(criteria.color).toBe('#FFF000');

        color.setName('green');
        criteria.setColor(color);
        expect(criteria.color).toBe('green');

        expect(criteria.getState()).toStrictEqual({
            color: 'green',
            fast: false,
            duration: 1.0
        });
    });

    it('should set the brightness flag', () => {
        const selector = (new SelectorCriteria()).setAll();
        const criteria = new StateCriteria(selector);

        criteria.setBrightness(0);
        expect(criteria.brightness).toBe(0);
        expect(criteria.getState()).toStrictEqual({
            brightness: 0,
            fast: false,
            duration: 1.0
        });
    
        criteria.setBrightness(20);
        expect(criteria.brightness).toBe(0.2);
        expect(criteria.getState()).toStrictEqual({
            brightness: 0.2,
            fast: false,
            duration: 1.0
        });
    
        expect(() => {
            criteria.setBrightness(-1);
        }).toThrow();
    
        expect(() => {
            criteria.setBrightness(101);
        }).toThrow();
    });

    it('should set the infrared flag', () => {
        const selector = (new SelectorCriteria()).setAll();
        const criteria = new StateCriteria(selector);

        criteria.setInfrared(0);
        expect(criteria.infrared).toBe(0);
        expect(criteria.getState()).toStrictEqual({
            infrared: 0,
            fast: false,
            duration: 1.0
        });
    
        criteria.setInfrared(20);
        expect(criteria.infrared).toBe(0.2);
        expect(criteria.getState()).toStrictEqual({
            infrared: 0.2,
            fast: false,
            duration: 1.0
        });
    
        expect(() => {
            criteria.setInfrared(-1);
        }).toThrow();
    
        expect(() => {
            criteria.setInfrared(101);
        }).toThrow();
    });

    it('should return the selector', () => {
        const selector = (new SelectorCriteria()).setAll(true);
        const criteria = new StateCriteria(selector);
        
        expect(criteria.getSelector()).toBe('all:random');
    });

    it('should throw an error when no selector was provided', () => {
        const state = new StateCriteria();

        expect(() => {
            state.getSelector();
        }).toThrow();
    });
});