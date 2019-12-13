import dotenv from 'dotenv';
import clientFactory from "../src/service/http-client";
import { AxiosResponse } from 'axios';

dotenv.config();

const token: string = process.env.TOKEN as string;

test('test a request', () => {
    const client = clientFactory(token);
    client.get('lights/all').then((response: AxiosResponse) => {
        expect(response.data.length).toBeGreaterThan(1);
    });
});