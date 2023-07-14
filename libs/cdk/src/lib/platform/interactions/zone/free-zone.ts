import { NgZone } from '@angular/core';
import { Unary, unary } from '@core-template';

import { Zonality } from '../../../directive';

type Fn<T> = (arg: T) => T;

// eslint-disable-next-line @typescript-eslint/ban-types
export const outZone = <T>(ngZone: NgZone, fn: Function): T =>
    ngZone.runOutsideAngular<T>(() => fn());

export const outNgZone = <T extends Zonality>(fn: Fn<T>): Unary<T> =>
    unary((data) => data.ngZone.runOutsideAngular<T>(() => fn(data)));
