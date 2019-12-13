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

export default class BasicColorCriteria {
    color: string;

    constructor() {
        this.color = '';
    }

    setRgb(red: number, green: number, blue: number): BasicColorCriteria {
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

    setName(name: string): BasicColorCriteria {
        if (!colorNameWhiteList.includes(name)) {
            throw Error(
                `Color name is not valid, use one of the following values: ${colorNameWhiteList.join(', ')}`
            );
        }

        this.color = name;
        return this;
    }

    setHex(hexValue: string): BasicColorCriteria {
        const transformedValue = hexValue.toUpperCase();
        if (!/^#[0-9A-F]{6}$/.test(transformedValue)) {
            throw Error(
                'Hex value is not valid'
            );
        }

        this.color = transformedValue;
        return this;
    }

    getColor(): string {
        return this.color;
    }
}