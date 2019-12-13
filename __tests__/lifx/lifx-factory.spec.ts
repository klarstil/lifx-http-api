import dotenv from 'dotenv';
import LifxFactory from '../../src/lifx/lifx-factory';
import SelectorCriteria from '../../src/criteria/selector-criteria';
import LifxDevice from '../../src/lifx/lifx-device';

import lightsFixtures from '../../__fixtures__/lights';
import sceneFixtures from '../../__fixtures__/scenes';

import mockAxios from 'jest-mock-axios';
import { AxiosResponse } from 'axios';
import { LifxScene } from '../../@types/lifx';

dotenv.config();

describe('lifx factory', () => {
    afterEach(() => {
        // cleaning up the mess left behind the previous test
        mockAxios.reset();
    });

    it('should get all lights', (done) => {
        const token = process.env.TOKEN as string;
        const factory = new LifxFactory(token);
        const selectorCriteria = (new SelectorCriteria())
            .setAll();

        factory.getLights(selectorCriteria).then((devices: any) => {
            expect(devices.length).toBe(3);
            expect(devices[0]).toBeInstanceOf(LifxDevice);
            done();
        });
        mockAxios.mockResponse({ data: lightsFixtures } as AxiosResponse);
    });
    
    it('should get all scenes', (done) => {
        const token = process.env.TOKEN as string;
        const factory = new LifxFactory(token);

        factory.getScenes().then((response: AxiosResponse) => {
            const scenes: LifxScene[] = response.data;
            expect(scenes.length).toBe(2);
            done();
        });
        mockAxios.mockResponse({ data: sceneFixtures } as AxiosResponse);
    });
});