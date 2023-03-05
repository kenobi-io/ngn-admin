import {
    ElementRef,
    inject,
    InjectionToken,
    INJECTOR,
    Provider,
    TemplateRef,
} from '@angular/core';
import { Model } from '@core-template';
import {
    changes,
    OVERLAY,
    RENDER2_TOKEN,
    VIEW_CONTAINER_REF_TOKEN,
    ZONE_TOKEN,
} from '@ngn-template/cdk';

import {
    ContextPopover,
    FireUsePopover,
    InputOptionsOpenPopover,
} from '../data';
import { FirePopoverDirective } from '../directives';

export type FirePopover<T> = {
    options: InputOptionsOpenPopover<T>;
    onClick: () => void;
};

export const CHANGE_FIRE_USE_POPOVER = new InjectionToken<
    FireUsePopover<Model>
>('[CHANGE_FIRE_USE_POPOVER]');

export const createFireUsePopover = <T>(
    change?: Partial<FireUsePopover<T>>
): FireUsePopover<T> => {
    const use: FireUsePopover<T> = {
        closeEventKind: 'close',
        elementRef: inject(ElementRef<HTMLElement>),
        injector: inject(INJECTOR),
        ngZone: inject(ZONE_TOKEN),
        overlay: inject(OVERLAY),
        renderer: inject(RENDER2_TOKEN),
        templateRef: inject(TemplateRef<ContextPopover<T>>),
        viewContainerRef: inject(VIEW_CONTAINER_REF_TOKEN),
    };
    changes(use, change, CHANGE_FIRE_USE_POPOVER);

    return use;
};

export const FIRE_USE_POPOVER = new InjectionToken<FireUsePopover<Model>>(
    '[FIRE_USE_POPOVER]',
    {
        factory: () => createFireUsePopover(),
    }
);

export const FIRE_USE_POPOVER_PROVIDER: Provider = {
    deps: [FirePopoverDirective],
    provide: FIRE_USE_POPOVER,
    useFactory: <T>(directive: FirePopoverDirective<T>): FireUsePopover<T> => {
        const use: FireUsePopover<T> = createFireUsePopover(directive);
        use.onClick = directive.onClick.bind(directive);
        use.optionsOpen = directive.options;
        return use;
    },
};
