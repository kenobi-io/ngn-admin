import { NgZone } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/ban-types
export const outZone = <T>(ngZone: NgZone, fn: Function): T =>
    ngZone.runOutsideAngular<T>(() => fn());
