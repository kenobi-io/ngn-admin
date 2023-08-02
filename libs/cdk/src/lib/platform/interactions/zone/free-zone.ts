import { NgZone } from '@angular/core';
import { Mono, mono } from '@core-template';

import { Zonality } from '../../../directive';

type Fn<T> = (arg: T) => T;

// eslint-disable-next-line @typescript-eslint/ban-types
export const outZone = <T>(ngZone: NgZone, fn: Function): T =>
    ngZone.runOutsideAngular<T>(() => fn());

export const outNgZone = <T extends Zonality>(fn: Fn<T>): Mono<T> =>
    mono((data) => data.ngZone.runOutsideAngular<T>(() => fn(data)));
