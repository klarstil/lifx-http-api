export default class AdvancedColorCriteria {
    hue: number|null;
    saturation: number|null;
    brightness: number|null;
    kelvin: number|null;
    
    constructor() {
        this.hue = null;
        this.saturation = null;
        this.brightness = null;
        this.kelvin = null;
    }

    setHue(value: number): AdvancedColorCriteria {
        if (value < 0 || value > 360) {
            throw Error(
                'Hue value is not valid. Define a value between 0-360'
            );
        }
        this.hue = value;
        return this;
    }

    setSaturation(value: number): AdvancedColorCriteria {
        if (value < 0 || value > 100) {
            throw Error(
                'Saturation value is not valid. Define a value between 0-100'
            );
        }

        this.saturation = value / 100;
        return this;
    }
    
    setBrightness(value: number): AdvancedColorCriteria {
        if (value < 0 || value > 100) {
            throw Error(
                'Brightness value is not valid. Define a value between 0-100'
            );
        }

        this.brightness = value / 100;
        return this;
    }

    setKelvin(value: number): AdvancedColorCriteria {
        if (value < 1500 || value > 9000) {
            throw Error(
                'Brightness value is not valid. Define a value between 1500-9000'
            );
        }

        this.kelvin = value;
        return this;
    }

    getColor(): string|null {
        const color: object = {
            hue: this.hue,
            saturation: this.saturation,
            brightness: this.brightness,
            kelvin: this.kelvin
        };

        return Object.entries(color).reduce((accumulator: string, [key, value]: [string, number]) => {
            if (value === null) {
              return accumulator;
            }
      
            return `${key}:${value} ${accumulator} `;
          }, '').trim() || null;
    }
}