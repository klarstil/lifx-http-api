import axios, { AxiosInstance } from 'axios';
import { toCamel, toSnake } from 'convert-keys';

export default (bearerToken: string, apiVersion: string = 'v1'): AxiosInstance => {
    return axios.create({
        baseURL: `https://api.lifx.com/${apiVersion}/`,
        transformResponse: [responseTransformer],
        transformRequest: [requestTransformer],
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        }
    });
};

export const responseTransformer = (data: string): object => {
    const json: object = JSON.parse(data);

    return toCamel(json);
};

export const requestTransformer = (data: object): string => {
    const transformedData: object = toSnake(data);

    return JSON.stringify(transformedData);
}
