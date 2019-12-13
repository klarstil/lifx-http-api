import SelectorCriteria from '../../src/criteria/selector-criteria';

it('should allow chaining', () => {
    const criteria = new SelectorCriteria();
    expect(criteria.setAll() instanceof SelectorCriteria).toBe(true);
});

it('should set an "all" selector', () => {
    let criteria = new SelectorCriteria();
    expect(
        criteria.setAll().getSelector()
    ).toBe('all');

    criteria = new SelectorCriteria();
    expect(
        criteria.setAll(true).getSelector()
    ).toBe('all:random');
});

it('should set an "id" selector', () => {
    let criteria = new SelectorCriteria();
    expect(
        criteria.setId('adf1334').getSelector()
    ).toBe('id:adf1334');

    criteria = new SelectorCriteria();
    expect(() => {
        criteria.setId('').getSelector()
    }).toThrow();
});

it('should set a "label" selector', () => {
    let criteria = new SelectorCriteria();
    expect(
        criteria.setLabel('KitchenLamp').getSelector()
    ).toBe('label:KitchenLamp');

    criteria = new SelectorCriteria();
    expect(() => {
        criteria.setLabel('').getSelector()
    }).toThrow();
});

it('should set a "group" selector', () => {
    let criteria = new SelectorCriteria();
    expect(
        criteria.setGroup('Kitchen').getSelector()
    ).toBe('group:Kitchen');

    // random flag
    criteria = new SelectorCriteria();
    expect(
        criteria.setGroup('Kitchen', true).getSelector()
    ).toBe('group:Kitchen:random');

    criteria = new SelectorCriteria();
    expect(() => {
        criteria.setGroup('').getSelector()
    }).toThrow();
});

it('should set a "group id" selector', () => {
    let criteria = new SelectorCriteria();
    expect(
        criteria.setGroupId('adf1334').getSelector()
    ).toBe('group_id:adf1334');

    // random flag
    criteria = new SelectorCriteria();
    expect(
        criteria.setGroupId('adf1334', true).getSelector()
    ).toBe('group_id:adf1334:random');

    criteria = new SelectorCriteria();
    expect(() => {
        criteria.setGroupId('').getSelector()
    }).toThrow();
});

it('should set a "location" selector', () => {
    let criteria = new SelectorCriteria();
    expect(
        criteria.setLocation('Home').getSelector()
    ).toBe('location:Home');

    // random flag
    criteria = new SelectorCriteria();
    expect(
        criteria.setLocation('Home', true).getSelector()
    ).toBe('location:Home:random');

    criteria = new SelectorCriteria();
    expect(() => {
        criteria.setLocation('').getSelector()
    }).toThrow();
});

it('should set a "location id" selector', () => {
    let criteria = new SelectorCriteria();
    expect(
        criteria.setLocationId('adf1334').getSelector()
    ).toBe('location_id:adf1334');

    // random flag
    criteria = new SelectorCriteria();
    expect(
        criteria.setLocationId('adf1334', true).getSelector()
    ).toBe('location_id:adf1334:random');

    criteria = new SelectorCriteria();
    expect(() => {
        criteria.setLocationId('').getSelector()
    }).toThrow();
});

it('should set a "scene id" selector', () => {
    let criteria = new SelectorCriteria();
    expect(
        criteria.setSceneId('adf1334').getSelector()
    ).toBe('scene_id:adf1334');

    // random flag
    criteria = new SelectorCriteria();
    expect(
        criteria.setSceneId('adf1334', true).getSelector()
    ).toBe('scene_id:adf1334:random');

    criteria = new SelectorCriteria();
    expect(() => {
        criteria.setSceneId('').getSelector()
    }).toThrow();
});

it('should throw an error when the selector chain exceeds 25', () => {
    const generateRandomId = (): string => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    const criteria = new SelectorCriteria();

    for(let i = 0; i <= 26; i++) {
        criteria.setId(generateRandomId());
    }

    expect(() => {
        criteria.getSelector();
    }).toThrow();
});

it('should return null if no selector is provided', () => {
    const criteria = new SelectorCriteria();
    expect(criteria.getSelector()).toBe(null);
});