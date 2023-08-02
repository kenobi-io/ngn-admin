import { NgZone } from '@angular/core';
import { Mono, mono } from '@core-template';

import { Zonality } from '../../../directive';

/**
 * @deprecated use inNgZone
 * Creates an observable where all callbacks are executed inside a given zone
 * @param zone
 * @param fn is function for run inside NgZone
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const inZone = <T>(ngZone: NgZone, fn: Function): T =>
    ngZone.run<T>(() => fn());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn<T> = (arg: T) => any;

/**
 * Creates an observable where all callbacks are executed inside a given zone
 * @param zone
 * @param fn is function for run inside NgZone
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const inNgZone = <T extends Partial<Zonality>>(
    fn: Fn<T>,
    ngZone?: NgZone
): Mono<T> =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mono((data) => {
        if (data.ngZone) {
            (data.ngZone as NgZone).run<T>(() => fn(data));
        } else if (ngZone) {
            ngZone.run<T>(() => fn(data));
        }
    });
