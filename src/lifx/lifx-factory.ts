import httpClientFactory from '../service/http-client';
import { AxiosInstance, AxiosResponse, AxiosPromise } from 'axios';
import SelectorCriteria from '../criteria/selector-criteria';
import LifxDevice from './lifx-device';

export default class LifxFactory {
    client: AxiosInstance;

    constructor(token: string) {
        this.client = httpClientFactory(token);
    }

    getLights(selector: SelectorCriteria): AxiosPromise {
        return this.client.get(`lights/${selector.getSelector()}`)
            .then((response: AxiosResponse) => {
                 return response.data.map((device: object) => {
                     return new LifxDevice(device);
                 });
            });
    }

    getScenes(): AxiosPromise {
        return this.client('scenes');
    }
}