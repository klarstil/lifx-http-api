import axios, { AxiosInstance } from 'axios';

export default (bearerToken: string, apiVersion = 'v1'): AxiosInstance => {
    if (!bearerToken || !bearerToken.length) {
        throw Error('No bearer token provided');
    }

    return axios.create({
        baseURL: `https://api.lifx.com/${apiVersion}/`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        }
    });
};