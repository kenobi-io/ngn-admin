import { NgZone } from '@angular/core';
import { Unary, unary } from '@core-template';

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

type Fn<T> = (arg: T) => T;

/**
 * Creates an observable where all callbacks are executed inside a given zone
 * @param zone
 * @param fn is function for run inside NgZone
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const inNgZone = <T extends Zonality>(fn: Fn<T>): Unary<T> =>
    unary((data) => data.ngZone.run<T>(() => fn(data)));
