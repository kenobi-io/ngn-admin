/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter, NgZone } from '@angular/core';
import { jest } from '@jest/globals';

/**
 * Provides a noop implementation of `NgZone` which does nothing. This zone requires explicit calls
 * to framework to perform rendering.
 */
export class MockNgZone implements NgZone {
    readonly hasPendingMicrotasks: boolean = false;
    readonly hasPendingMacrotasks: boolean = false;
    readonly isStable: boolean = true;
    readonly onUnstable: EventEmitter<unknown> = new EventEmitter();
    readonly onMicrotaskEmpty: EventEmitter<unknown> = new EventEmitter();
    readonly onStable: EventEmitter<unknown> = new EventEmitter();
    readonly onError: EventEmitter<unknown> = new EventEmitter();

    runOutsideAngular = (): any => jest.fn((fn: () => void) => fn());
    runGuarded = (fn: (...args: unknown[]) => unknown): any => jest.fn(fn);
    run = <T>(fn: (...args: unknown[]) => T): any => jest.fn(fn);

    // eslint-disable-next-line no-unused-vars
    runTask = (fn: (...args: unknown[]) => unknown): any => jest.fn(fn);
}

export const mockNoopNgZone: NgZone = {} as NgZone;

// eslint-disable-next-line @typescript-eslint/ban-types
export const mockNgZone: NgZone & { simulateZoneExit?: Function } = {
    hasPendingMacrotasks: false,
    hasPendingMicrotasks: false,
    isStable: true,
    onError: jest.fn<any>() as any,
    onMicrotaskEmpty: jest.fn<any>() as any,
    onStable: new EventEmitter(false),
    onUnstable: jest.fn<any>() as any,
    run: jest.fn() as any,
    runGuarded: jest.fn() as any,
    runOutsideAngular: jest.fn() as any,
    runTask: jest.fn() as any,
    simulateZoneExit: function (): void {
        this.onStable.emit(null);
    },
};
