/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter, NgZone } from '@angular/core';

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

    run<T>(
        fn: (...args: unknown[]) => T,
        applyThis?: unknown,
        applyArgs?: unknown
    ): T {
        return fn.apply(applyThis, applyArgs as T[]);
    }

    runGuarded<T>(
        fn: (...args: unknown[]) => unknown,
        applyThis?: unknown,
        applyArgs?: unknown
    ): T {
        return fn.apply(applyThis as T, applyArgs as T[]) as T;
    }

    runOutsideAngular<T>(fn: (...args: unknown[]) => T): T {
        return fn();
    }

    // eslint-disable-next-line no-unused-vars
    runTask<T>(
        fn: (...args: unknown[]) => T,
        applyThis?: unknown,
        applyArgs?: unknown,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        name?: string
    ): T {
        return fn.apply(applyThis, applyArgs as T[]);
    }
}

export const mockNoopNgZone: NgZone = {} as NgZone;

export const mockNgZone: NgZone = /*  {
    onError: jest.fn<any>() as unknown as EventEmitter<any>,
    run: jest.fn(),
    runOutsideAngular: jest.fn(),
    runTask: jest.fn(),
}; */ new MockNgZone();
