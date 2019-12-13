export interface LifxDeviceColor {
    hue: number,
    saturation: number,
    kelvin: number,
    zone?: number,
    brightness?: number
}

export interface LifxZone {
    count: number,
    zones: Array<LifxDeviceColor>
}

export interface LifxGroupLocation {
    id: string,
    name: string
}

export interface LifxProductCapabilities {
    has_color: boolean,
    has_variable_color_temp: boolean,
    has_ir: boolean,
    has_chain: boolean,
    has_multizone: boolean,
    min_kelvin: number,
    max_kelvin: number
}

export interface LifxProduct {
    name: string,
    identifier: string,
    company: string,
    capabilities: LifxProductCapabilities
}

export interface LifxChainChildren {
    height: number,
    index: number,
    user_x: number,
    user_y: number,
    width: number
}

export interface LifxChain {
    count: number,
    children: Array<LifxChainChildren>
}

export interface LifxStateOptions {
    power?: string,
    color?: LifxDeviceColor,
    brightness?: number,
    duration?: number,
    infrared?: number,
    fast?: boolean,
    selector?: string
}

export interface LifxMultiStatesOptions {
    states: Array<LifxStateOptions>,
    defaults: LifxStateOptions
}

export interface LifxEffectOptions {
    color: string,
    from_color?: string,
    period?: number,
    cycles?: number,
    persist?: boolean,
    power_on?: boolean,
    peak?: number
}

interface LifxCycleOptions extends LifxMultiStatesOptions {
    direction?: string
}

export interface LifxApiDevice {
    id: string,
    uuid: string,
    label: string,
    connected: boolean,
    power: string,
    color: LifxDeviceColor,
    brightness: number,
    effect: string,
    chain?: LifxChain
    zones?: LifxZone,
    group: LifxGroupLocation,
    location: LifxGroupLocation,
    product: LifxProduct,
    last_seen: string,
    seconds_since_seen: number
}

export interface LifxScene {
    uuid: string,
    name: string,
    account: {
        uuid: string
    },
    states: LifxStateOptions[],
    created_at: number,
    updated_at: number
}