import { changes } from '../../platform';
import { DomPortalOutlet } from '../data';

export const domPortalOutlet = <T>(
    change?: Partial<DomPortalOutlet<T>>
): DomPortalOutlet<T> => {
    const map: MapStrategyAttach = new Map()
        .set('ComponentPortal', attachComponentPortalOutlet)
        .set('TemplatePortal', attachTemplatePortalOutlet)
        .set('DomPortal', attachDomPortalOutlet);

    const dom: DomPortalOutlet<T> = {
        isDisposed: false,
        // mapStrategyFnsAttach: map,
        // strategyAttachKind: 'DomPortal',
    };
    changes(dom, change);

    return dom;
};
