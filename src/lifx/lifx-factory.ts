import httpClientFactory from '../service/http-client';
import { AxiosInstance, AxiosResponse } from 'axios';
import SelectorCriteria from '../criteria/selector-criteria';
import { LifxEffectResult, LifxScene, LifxApiDevice } from '../../@types/lifx';

export default class LifxFactory {
    client: AxiosInstance;

    constructor(token: string) {
        this.client = httpClientFactory(token);
    }

    getLights(selector: SelectorCriteria): Promise<LifxApiDevice[]> {
        return this.client.get(`lights/${selector.getSelector()}`).then((response: AxiosResponse) => {
            return response.data as LifxApiDevice[];
        });
    }

    getScenes(): Promise<LifxScene[]> {
        return this.client.get('scenes').then((response: AxiosResponse) => {
            return response.data as LifxScene[];
        });
    }
    
    togglePower(selector: SelectorCriteria, duration = 1.0): Promise<LifxEffectResult> {
        return this.client.post(`lights/${selector.getSelector()}/toggle`, {
            duration
        }).then((response: AxiosResponse) => {
            return response.data as LifxEffectResult;
        });
    }

    toggleEffectsOff(selector: SelectorCriteria, powerOff = false): Promise<LifxEffectResult> {
        return this.client.post(`lights/${selector.getSelector()}/effects/off`, {
            power_off: powerOff
        }).then((response: AxiosResponse) => {
            return response.data as LifxEffectResult;
        });
    }
}