import StateCollection from '../../src/state/state-collection';
import StateCriteria from '../../src/state/state-criteria';
import SelectorCriteria from '../../src/criteria/selector-criteria';
import ColorCriteria from '../../src/criteria/color-criteria';

describe('state collection', () => {
    it('should allow chaining', () => {
        const collection = new StateCollection();
        expect(collection.clear() instanceof StateCollection).toBe(true);
    });

    it('should accept an array of states as constructor argument', () => {
        const states = []
        for(let i = 0; i < 10; i++) {
            const selector = (new SelectorCriteria()).setGroup(`foo-${i}`);
            const state = (new StateCriteria(selector)).setBrightness(i);
            states.push(state);
        }
        const collection = new StateCollection(states);
        expect(collection.size).toBe(10);
    });

    it('should add a new state', () => {
        const collection = new StateCollection();
        const selector = (new SelectorCriteria()).setAll();
        const state = (new StateCriteria(selector)).setBrightness(100);

        collection.add(state);
        expect(collection.size).toBe(1);

        expect(() => {
            collection.add(state);
        }).toThrow();

        expect(collection.getStates()).toStrictEqual({
            states: [{
                brightness: 1,
                duration: 1,
                selector: 'all'
            }],
            fast: false
        });
    });

    it('should force add a new state', () => {
        const collection = new StateCollection();
        const selector = (new SelectorCriteria()).setAll();
        const state = (new StateCriteria(selector)).setBrightness(100);

        collection.add(state);
        expect(collection.size).toBe(1);

        expect(collection.getStates()).toStrictEqual({
            states: [{
                brightness: 1,
                duration: 1,
                selector: 'all'
            }],
            fast: false
        });

        state.setBrightness(50);
        collection.add(state, true);
        expect(collection.size).toBe(1);

        expect(collection.getStates()).toStrictEqual({
            states: [{
                brightness: 0.5,
                duration: 1,
                selector: 'all'
            }],
            fast: false
        });
    });

    it('should get a given state', () => {
        const collection = new StateCollection();
        const selector = (new SelectorCriteria()).setGroup(`foo`);
        const state = (new StateCriteria(selector)).setBrightness(75);

        collection.add(state);

        expect(collection.get(state.getSelector())).toBe(state);
    });

    it('should check if a state is added already', () => {
        const collection = new StateCollection();
        const selector = (new SelectorCriteria()).setGroup(`foo`);
        const state = (new StateCriteria(selector)).setBrightness(75);

        collection.add(state);

        expect(collection.has(state)).toBe(true);
    });

    it('should remove a given state from the collection', () => {
        const collection = new StateCollection();
        const selector = (new SelectorCriteria()).setAll();
        const state = (new StateCriteria(selector)).setBrightness(100);

        collection.add(state);
        expect(collection.size).toBe(1);

        collection.remove(state);
        expect(collection.size).toBe(0);

        const nonExistingState = (new StateCriteria(selector)).setBrightness(100);
        
        expect(() => {
            collection.remove(nonExistingState);
        }).toThrow();
    });

    it('should be able to define defaults', () => {
        const collection = new StateCollection();
        const selector = (new SelectorCriteria()).setAll();
        const state = (new StateCriteria(selector)).setBrightness(100);

        collection.add(state);

        const defaults = (new StateCriteria())
            .setBrightness(75)
            .setPower(true);

        collection.setDefaults(defaults);

        expect(collection.getStates()).toStrictEqual({
            states: [{
                brightness: 1,
                duration: 1,
                selector: 'all'
            }],
            fast: false,
            defaults: {
                power: 'on',
                brightness: 0.75,
                duration: 1
            }
        });
    });

    it('should throw an error when too many entities are in the collection', () => {
        const collection = new StateCollection();
        for(let i = 0; i <= 50; i++) {
            const selector = (new SelectorCriteria()).setGroup(`foo-${i}`);
            const state = (new StateCriteria(selector)).setBrightness(i);
            collection.add(state);
        }

        expect(() => {
            collection.getStates();
        }).toThrow();
    });

    it('should clear the state collection', () => {
        const collection = new StateCollection();
        const selector = (new SelectorCriteria()).setGroup(`foo`);
        const state = (new StateCriteria(selector)).setBrightness(75);

        collection.add(state);
        
        expect(collection.size).toBe(1);
        collection.clear();

        expect(collection.size).toBe(0);
    });
});