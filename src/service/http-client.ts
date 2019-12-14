import axios, { AxiosInstance } from 'axios';

export default (bearerToken: string, apiVersion = 'v1'): AxiosInstance => {
    return axios.create({
        baseURL: `https://api.lifx.com/${apiVersion}/`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        }
    });
};