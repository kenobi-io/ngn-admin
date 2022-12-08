import { InjectionToken } from '@angular/core';

interface Console {
    log(...data: unknown[]): void;
}

export const HTTP_LOGGER = new InjectionToken<Console>('logger for request', {
    factory: () => console,
});
