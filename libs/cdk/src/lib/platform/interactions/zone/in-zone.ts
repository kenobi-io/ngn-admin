import { NgZone } from '@angular/core';

/**
 * Creates an observable where all callbacks are executed inside a given zone
 * @param zone
 * @param fn is function for run inside NgZone
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const inZone = <T>(ngZone: NgZone, fn: Function): T =>
    ngZone.run<T>(() => fn());
