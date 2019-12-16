import ColorCriteria from "../criteria/color-criteria";
import SelectorCriteria from "../criteria/selector-criteria";
import { LifxStateOptions } from "../@types/lifx";

export default class StateCriteria {
    selector: null|SelectorCriteria;
    power: null|string;
    color: null|string;
    brightness: null|number;
    duration: number;
    infrared: null|number;
    fast: boolean;

    constructor(selector: null|SelectorCriteria = null) {
        this.selector = selector;
        this.power = null;
        this.color = null;
        this.brightness = null;
        this.duration = 1.0;
        this.infrared = null;
        this.fast = false;
    }

    setPower(toggle: boolean): StateCriteria {
        this.power = (toggle ? 'on' : 'off');
        return this;
    }
    
    setColor(color: ColorCriteria): StateCriteria {
        this.color = color.getColor();
        return this;
    }

    setBrightness(value: number): StateCriteria {
        if (value < 0 || value > 100) {
            throw Error(
                'Brightness value is not valid. Define a value between 0-100'
            );
        }

        this.brightness = value / 100;
        return this;
    }

    setInfrared(value: number): StateCriteria {
        if (value < 0 || value > 100) {
            throw Error(
                'Infrared value is not valid. Define a value between 0-100'
            );
        }

        this.infrared = value / 100;
        this.infrared = this.infrared;

        return this;
    }

    getState(noFastParam = false): LifxStateOptions {
        const config = {
            power: this.power,
            color: this.color,
            brightness: this.brightness,
            duration: this.duration,
            infrared: this.infrared,
            fast: this.fast
        };

        if (noFastParam) {
            delete config.fast;
        }

        return Object.entries(config).reduce((accumulator: object, [key, value]) => {
            if (value !== null) {
                accumulator = { ...accumulator, ...{ [key]: value } };
            }
            return accumulator;
        }, {});
    }

    getSelector(): string {
        if (!this.selector || !this.selector.selectors.length) {
            throw Error('Selector is not provided');
        }

        return this.selector.getSelector();
    }
}