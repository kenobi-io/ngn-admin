import { inject } from '@angular/core';

import { changes, ZONE_TOKEN } from '../../platform';
import { DomPortalOutlet } from '../data';

export const domPortalOutlet = <T>(
    domPortalOutlet: DomPortalOutlet<T>
): DomPortalOutlet<T> => {
    // const map: MapStrategyAttach = new Map()
    //     .set('ComponentPortal', attachComponentPortalOutlet)
    //     .set('TemplatePortal', attachTemplatePortalOutlet)
    //     .set('DomPortal', attachDomPortalOutlet);

    const dom: DomPortalOutlet<T> = {
        ...domPortalOutlet,
        isDisposed: false,
        // mapStrategyFnsAttach: map,
        // strategyAttachKind: 'DomPortal',
    };

    return dom;
};

export const createDomPortalOutlet = <T>(
    change?: Partial<DomPortalOutlet<T>>
): DomPortalOutlet<T> => {
    // const map: MapStrategyAttach = new Map()
    //     .set('ComponentPortal', attachComponentPortalOutlet)
    //     .set('TemplatePortal', attachTemplatePortalOutlet)
    //     .set('DomPortal', attachDomPortalOutlet);

    const dom: DomPortalOutlet<T> = {
        isDisposed: false,
        ngZone: inject(ZONE_TOKEN),
        // mapStrategyFnsAttach: map,
        // strategyAttachKind: 'DomPortal',
    };
    changes(dom, change);

    return dom;
};
