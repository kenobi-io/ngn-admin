import {
    ComponentFactoryResolver,
    inject,
    InjectionToken,
} from '@angular/core';

export const COMPONENT_FACTORY_RESOLVER_TOKEN =
    new InjectionToken<ComponentFactoryResolver>(
        '[COMPONENT_FACTORY_RESOLVER_TOKEN]',
        {
            factory: () => inject(ComponentFactoryResolver),
        }
    );
