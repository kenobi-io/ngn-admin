import { inject, InjectionToken, ViewContainerRef } from '@angular/core';

export const VIEW_CONTAINER_REF_TOKEN = new InjectionToken<ViewContainerRef>(
    '[VIEW_CONTAINER_REF_TOKEN]',
    {
        factory: () => inject(ViewContainerRef),
    }
);
