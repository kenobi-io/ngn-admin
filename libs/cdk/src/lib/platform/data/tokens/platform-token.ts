import { Platform } from '@angular/cdk/platform';
import { inject, InjectionToken } from '@angular/core';

export const PLATFORM_TOKEN = new InjectionToken<Platform>('[PLATFORM_TOKEN]', {
    factory: () => inject(Platform),
});
