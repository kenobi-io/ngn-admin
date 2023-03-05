import { inject, InjectionToken, Renderer2 } from '@angular/core';

export const RENDER2_TOKEN = new InjectionToken<Renderer2>('[RENDER2_TOKEN]', {
    factory: () => inject(Renderer2),
});
