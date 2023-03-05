import { inject, InjectionToken, NgZone } from '@angular/core';

export const ZONE_TOKEN = new InjectionToken<NgZone>('[ZONE_TOKEN]', {
    factory: () => inject(NgZone),
});
