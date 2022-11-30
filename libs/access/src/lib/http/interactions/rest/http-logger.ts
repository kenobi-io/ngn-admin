import { InjectionToken } from '@angular/core';

export const HTTP_LOGGER = new InjectionToken<Console>('logger for request', {
    factory: () => console,
});
