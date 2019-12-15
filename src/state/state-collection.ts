import StateCriteria from "./state-criteria";

export default class StateCollection {
    states: Map<string, StateCriteria>;
    defaults: StateCriteria|null;
    fast: boolean;

    constructor(states: StateCriteria[] = [], fast: boolean = false) {
        this.states = new Map();
        this.defaults = null;
        this.fast = fast;

        states.forEach((state: StateCriteria) => {
            this.add(state);
        });
    }

    setDefaults(state: StateCriteria): StateCollection {
        this.defaults = state;
        return this;
    }

    get(selector: string): StateCriteria|undefined {
        return this.states.get(selector);
    }
    
    add(state: StateCriteria, force: boolean = false): StateCollection {
        const selector = state.getSelector();

        if (!force && this.has(state)) {
            throw Error(`State for selector "${selector}" already exists in collection`);
        }

        this.states.set(selector, state);

        return this;
    }

    has(state: StateCriteria): boolean {
        return this.states.has(state.getSelector());
    }

    remove(state: StateCriteria): StateCollection {
        const selector = state.getSelector();
        
        if (!this.has(state)) {
            throw Error(`State for selector "${selector}" is not in collection`);
        }

        this.states.delete(selector);

        return this;
    }

    clear(): StateCollection {
        this.states.clear();
        return this;
    }

    getStates(): object {
        if (this.states.size > 50) {
            throw Error('State collection is too large, no more than 50 entires allowed');
        }

        const states = Array.from(this.states).map(([selector, value]: [string, StateCriteria]) => {
            return { ...value.getState(true), ...{ selector: selector }};
        });

        let params = {
            states,
            fast: this.fast
        };

        if (this.defaults) {
            params = { ...params, ...{ defaults: this.defaults.getState(true) } };
        }

        return params;
    }
}