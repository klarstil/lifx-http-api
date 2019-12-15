import httpClientFactory from '../service/http-client';
import { AxiosInstance, AxiosResponse } from 'axios';
import SelectorCriteria from '../criteria/selector-criteria';
import { LifxEffectResult, LifxScene, LifxApiDevice, LifxMultiStatesResult } from '../@types/lifx';
import StateCriteria from '../state/state-criteria';
import StateCollection from '../state/state-collection';

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

    setState(state: StateCriteria): Promise<LifxEffectResult> {
        return this.client.put(`lights/${state.getSelector()}/state`,
            state.getState()
        ).then((response: AxiosResponse) => {
            return response.data as LifxEffectResult;
        });
    }

    setStates(states: StateCollection): Promise<LifxMultiStatesResult> {
        return this.client.put('lights/states',
            states.getStates()
        ).then((response: AxiosResponse) => {
            return response.data as LifxMultiStatesResult;
        });
    }

    setStateDelta(state: StateCriteria): Promise<LifxEffectResult> {
        return this.client.post(`lights/${state.getSelector()}/state/delta`,
            state.getState(true)
        ).then((response: AxiosResponse) => {
            return response.data as LifxEffectResult;
        });
    }
}