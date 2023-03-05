import { changes } from '../../platform';
import { DomPortalOutlet, MapStrategyAttach } from '../data';
import { attachComponentPortalOutlet } from './attach-component-portal-outlet';
import { attachDomPortalOutlet } from './attach-dom-portal-outlet';
import { attachTemplatePortalOutlet } from './attach-template-portal-outlet';

export const domPortalOutlet = <T>(
    change?: Partial<DomPortalOutlet<T>>
): DomPortalOutlet<T> => {
    const map: MapStrategyAttach = new Map()
        .set('ComponentPortal', attachComponentPortalOutlet)
        .set('TemplatePortal', attachTemplatePortalOutlet)
        .set('DomPortal', attachDomPortalOutlet);

    const dom: DomPortalOutlet<T> = {
        isDisposed: false,
        mapStrategyFnsAttach: map,
        strategyAttachKind: 'DomPortal',
    };
    changes(dom, change);

    return dom;
};
