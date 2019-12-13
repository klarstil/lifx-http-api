export default class SelectorCriteria {
    selectors: string[];

    constructor() {
        this.selectors = [];
    }

    setAll(random: boolean = false) {
        this.selectors.push(`all${random ? ':random' : ''}`);
        
        return this;
    }

    setId(value: string): SelectorCriteria {
        if (!value || !value.length) {
            throw Error('ID is not valid, please provide a valid id');
        }

        this.selectors.push(`id:${value}`);
        
        return this;
    }

    setLabel(value: string): SelectorCriteria {
        if (!value || !value.length) {
            throw Error('Label is not valid, please provide a valid label');
        }

        this.selectors.push(`label:${value}`);
        
        return this;
    }

    setGroup(value: string, random: boolean = false): SelectorCriteria {
        if (!value || !value.length) {
            throw Error('Group is not valid, please provide a valid group');
        }

        this.selectors.push(`group:${value}${random ? ':random' : ''}`);
        
        return this;
    }

    setGroupId(value: string, random: boolean = false): SelectorCriteria {
        if (!value || !value.length) {
            throw Error('Group id is not valid, please provide a valid group id');
        }

        this.selectors.push(`group_id:${value}${random ? ':random' : ''}`);
        
        return this;
    }

    setLocation(value: string, random: boolean = false): SelectorCriteria {
        if (!value || !value.length) {
            throw Error('Location is not valid, please provide a valid location');
        }

        this.selectors.push(`location:${value}${random ? ':random' : ''}`);
        
        return this;
    }

    setLocationId(value: string, random: boolean = false): SelectorCriteria {
        if (!value || !value.length) {
            throw Error('Location id is not valid, please provide a valid location id');
        }

        this.selectors.push(`location_id:${value}${random ? ':random' : ''}`);
        
        return this;
    }

    setSceneId(value: string, random: boolean = false): SelectorCriteria {
        if (!value || !value.length) {
            throw Error('Scene id is not valid, please provide a valid scene id');
        }

        this.selectors.push(`scene_id:${value}${random ? ':random' : ''}`);
        
        return this;
    }

    getSelector(): string|null {
        if (this.selectors.length > 25) {
            throw Error('Selector chain too long, maximal 25 combined selectors are allowed');
        }
        return this.selectors.join(',') || null;
    }
}