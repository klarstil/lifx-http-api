import { AxiosInstance } from "axios";

export default class LifxDevice {
    data: object;
    client: AxiosInstance

    constructor(client: AxiosInstance, data: object) {
        this.client = client;
        this.data = data;
    }
}