export const colorNameWhiteList: string[] = [
    'white',
    'red',
    'orange',
    'yellow',
    'cyan',
    'green',
    'blue',
    'purple',
    'pink'
];

export default class ColorCriteria {
    hue: number|null;
    saturation: number|null;
    brightness: number|null;
    kelvin: number|null;
    color: string|null;
    
    constructor() {
        this.hue = null;
        this.saturation = null;
        this.brightness = null;
        this.kelvin = null;
        this.color = null;
    }

    setRgb(red: number, green: number, blue: number): ColorCriteria {
        if (red < 0 || red > 255) {
            throw Error('The red channel is not a valid value. Define a value between 0-255');
        }

        if (green < 0 || green > 255) {
            throw Error('The green channel is not a valid value. Define a value between 0-255');
        }

        if (blue < 0 || blue > 255) {
            throw Error('The blue channel is not a valid value. Define a value between 0-255');
        }

        this.color = `rgb:${red},${green},${blue}`;
        return this;
    }

    setName(name: string): ColorCriteria {
        if (!colorNameWhiteList.includes(name)) {
            throw Error(
                `Color name is not valid, use one of the following values: ${colorNameWhiteList.join(', ')}`
            );
        }

        this.color = name;
        return this;
    }

    setHex(hexValue: string): ColorCriteria {
        const transformedValue = hexValue.toUpperCase();
        if (!/^#[0-9A-F]{6}$/.test(transformedValue)) {
            throw Error(
                'Hex value is not valid'
            );
        }

        this.color = transformedValue;
        return this;
    }

    setHue(value: number): ColorCriteria {
        if (value < 0 || value > 360) {
            throw Error(
                'Hue value is not valid. Define a value between 0-360'
            );
        }
        this.hue = value;
        this.color = null;
        return this;
    }

    setSaturation(value: number): ColorCriteria {
        if (value < 0 || value > 100) {
            throw Error(
                'Saturation value is not valid. Define a value between 0-100'
            );
        }

        this.saturation = value / 100;
        this.color = null;
        return this;
    }
    
    setBrightness(value: number): ColorCriteria {
        if (value < 0 || value > 100) {
            throw Error(
                'Brightness value is not valid. Define a value between 0-100'
            );
        }

        this.brightness = value / 100;
        return this;
    }

    setKelvin(value: number): ColorCriteria {
        if (value < 1500 || value > 9000) {
            throw Error(
                'Brightness value is not valid. Define a value between 1500-9000'
            );
        }

        this.kelvin = value;
        this.color = null;
        return this;
    }

    getColor(): string|null {
        const color: object = {
            hue: this.hue,
            saturation: this.saturation,
            brightness: this.brightness,
            kelvin: this.kelvin
        };

        if (this.color) {
            return this.color;
        }

        return Object.entries(color).reduce((accumulator: string, [key, value]: [string, number]) => {
            if (value === null) {
              return accumulator;
            }
      
            return `${key}:${value} ${accumulator} `;
          }, '').trim() || null;
    }
}