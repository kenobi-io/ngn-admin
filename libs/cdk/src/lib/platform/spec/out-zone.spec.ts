/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter, NgZone } from '@angular/core';
import { mono, tube } from '@core-template';
import { describe, expect, it, jest } from '@jest/globals';
import { takeUntil, timer } from 'rxjs';

import { MonoOverlayCapability, OverlayCapability } from '../../overlay';
import { createMockOverlay, paramsCreateMockOverlay } from '../../overlay/spec';
import { outNgZone } from '../interactions';

// Unit Test using Jest
describe('outNgZone', () => {
    it('[outNgZone] should run provided functions inside promise then outside Angular zone for objects with ZoneCapability', async () => {
        const mockOverlay = createMockOverlay(paramsCreateMockOverlay as any);
        const hasAny = jest.fn(() => true);
        const doAnything = jest.fn();
        const context = Promise.resolve();
        const func = context.then;
        tube(
            method(),
            outNgZone(hasAny, doAnything, {
                context,
                func,
            })
        )({ overlay: mockOverlay, ...mockOverlay });

        await expect(
            mockOverlay.ngZone.runOutsideAngular
        ).toHaveBeenCalledTimes(1);

        await expect(hasAny).toHaveBeenCalledTimes(1);

        await expect(doAnything).toHaveBeenCalledTimes(1);
    });

    it('[outNgZone] should run provided functions inside subscribe outside Angular zone for objects with ZoneCapability', () => {
        const ngZoneMock = {
            runOutsideAngular: jest.fn(),
        } as unknown as NgZone;

        const mockOverlay: any = {};
        mockOverlay.ngZone = ngZoneMock;
        const hasAny = jest.fn(() => true);
        const doAnything = jest.fn();
        const context: EventEmitter<any> =
            mockOverlay.ngZone.onStable || new EventEmitter<any>();
        const func = context.pipe(takeUntil(timer(5000))).subscribe;
        tube(
            method(),
            outNgZone(hasAny, doAnything, {
                context,
                func,
            })
        )({ overlay: mockOverlay, ...mockOverlay });
        context.next(1);
        expect(mockOverlay.ngZone.runOutsideAngular).toHaveBeenCalledTimes(1);
        expect(hasAny).toHaveBeenCalledTimes(1);
        expect(doAnything).toHaveBeenCalledTimes(1);
    });

    it('[outNgZone] should not run provided functions outside Angular zone for objects without ZoneCapability', () => {
        const ngZoneMock = {
            runOutsideAngular: jest.fn(),
        } as unknown as NgZone;

        const mockOverlay: any = {};
        mockOverlay.ngZone = ngZoneMock;

        const hasAny = jest.fn(() => true);
        const doAnything = jest.fn();

        tube(method())({ overlay: mockOverlay, ...mockOverlay });

        expect(mockOverlay.ngZone.runOutsideAngular).not.toHaveBeenCalled();
        expect(hasAny).not.toHaveBeenCalled();
        expect(doAnything).not.toHaveBeenCalled();
    });
});

const method: MonoOverlayCapability<OverlayCapability> = () =>
    mono((data) => data);
