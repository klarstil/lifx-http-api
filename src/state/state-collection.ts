import StateCriteria from "./state-criteria";

export default class StateCollection {
    states: StateCriteria[];
    defaults: StateCriteria|null;
    fast: boolean;

    constructor(states: StateCriteria[] = [], fast = false) {
        this.states = [];
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
    
    add(state: StateCriteria, replace = false): StateCollection {
        const index = this.states.indexOf(state);
        
        if (index !== -1) {
            if (replace) {
                this.states[index] = state;
            } else {
                throw Error('State exists in collection already')
            }
        } else {
            this.states.push(state);
        }

        return this;
    }

    remove(state: StateCriteria): StateCollection {
        const index = this.states.indexOf(state);
        if (index === -1) {
            throw Error(`State is not in collection`);
        }

        this.states.splice(index, 1);

        return this;
    }

    get(selector: string): StateCriteria|undefined {
        return this.states.find((state: StateCriteria): boolean => {
            return state.getSelector() === selector;
        });
    }

    has(state: StateCriteria) {
        return this.states.indexOf(state) !== -1;
    }

    clear(): StateCollection {
        this.states = [];
        return this;
    }

    getStates(includeSelector = true): object {
        if (this.states.length > 50) {
            throw Error('State collection is too large, no more than 50 entires allowed');
        }

        const states = this.states.map((state: StateCriteria) => {
            let params = state.getState(true);

            if (includeSelector) {
                params = { ...params, ...{ selector: state.getSelector() } };
            }

            return params;
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

    get size() {
        return this.states.length;
    }
}