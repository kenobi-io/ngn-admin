import { DomPortalOutlet } from '../data';
import { disposePortalOutlet } from './dispose-portal-outlet';

/**
 * Clears out a portal from the DOM.
 */
export const disposeDomPortalOutlet = <T>(
    use: DomPortalOutlet<T>
): DomPortalOutlet<T> => {
    disposePortalOutlet(use);
    use.outletElement?.remove();
    return use;
};
