import dotenv from 'dotenv';
import LifxFactory from '../../src/lifx/lifx-factory';
import SelectorCriteria from '../../src/criteria/selector-criteria';
import ColorCriteria from '../../src/criteria/color-criteria';
import StateCriteria from '../../src/state/state-criteria';
import {
    lightsFixtures,
    sceneFixtures,
    effectFixtures,
    statesFixtures
} from '../../__fixtures__/';
import mockAxios from 'jest-mock-axios';
import { AxiosResponse } from 'axios';
import { LifxScene, LifxEffectResult, LifxMultiStatesResult } from '../../src/@types/lifx';
import StateCollection from '../../src/state/state-collection';

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
            done();
        });
        mockAxios.mockResponse({ data: lightsFixtures } as AxiosResponse);
    });
    
    it('should get all scenes', (done) => {
        const token = process.env.TOKEN as string;
        const factory = new LifxFactory(token);

        factory.getScenes().then((scenes: LifxScene[]) => {
            expect(scenes.length).toBe(2);
            done();
        });
        mockAxios.mockResponse({ data: sceneFixtures } as AxiosResponse);
    });

    it('should toggle power', (done) => {
        const token = process.env.TOKEN as string;
        const factory = new LifxFactory(token);
        const selectorCriteria = (new SelectorCriteria())
            .setAll();

        factory.togglePower(selectorCriteria).then((result: LifxEffectResult) => {
            expect(result.results.length).toBe(1);
            done();
        });

        mockAxios.mockResponse({ data: effectFixtures } as AxiosResponse);
    });

    it('should toggle effects off', (done) => {
        const token = process.env.TOKEN as string;
        const factory = new LifxFactory(token);
        const selectorCriteria = (new SelectorCriteria())
            .setAll();

        factory.toggleEffectsOff(selectorCriteria).then((result: LifxEffectResult) => {
            expect(result.results.length).toBe(1);
            done();
        });

        mockAxios.mockResponse({ data: effectFixtures } as AxiosResponse);
    });

    it('should set a state', (done) => {
        const token = process.env.TOKEN as string;
        const factory = new LifxFactory(token);
        const selector = (new SelectorCriteria())
            .setAll();

        const state = new StateCriteria(selector);
        state.setColor((new ColorCriteria()).setName('green'));

        factory.setState(state).then((result: LifxEffectResult) => {
            expect(result.results.length).toBe(1);
            done();
        });

        mockAxios.mockResponse({ data: effectFixtures } as AxiosResponse);
    });

    it('should set a states', (done) => {
        const token = process.env.TOKEN as string;
        const factory = new LifxFactory(token);
        const selector = (new SelectorCriteria())
            .setAll();

        const state = new StateCriteria(selector);
        state.setColor((new ColorCriteria()).setName('green'));
        const collection = new StateCollection([state]);

        factory.setStates(collection).then((result: LifxMultiStatesResult) => {
            expect(result.results.length).toBe(2);
            done();
        });

        mockAxios.mockResponse({ data: statesFixtures } as AxiosResponse);
    });

    it('should set a state delta', (done) => {
        const token = process.env.TOKEN as string;
        const factory = new LifxFactory(token);
        const selector = (new SelectorCriteria())
            .setAll();

        const state = new StateCriteria(selector);
        state.setColor((new ColorCriteria()).setName('green'));

        factory.setStateDelta(state).then((result: LifxEffectResult) => {
            expect(result.results.length).toBe(1);
            done();
        });

        mockAxios.mockResponse({ data: effectFixtures } as AxiosResponse);
    });
});