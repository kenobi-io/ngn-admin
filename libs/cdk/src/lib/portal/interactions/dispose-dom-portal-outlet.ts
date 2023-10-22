import { mono, tube } from '@core-template';

import {
    DomPortalOutletCapability,
    MonoPortalOutletCapability,
} from '../data/capability';
import { disposePortalOutlet } from './dispose-portal-outlet';

/**
 * Clears out a portal from the DOM.
 */
export const disposeDomPortalOutlet: MonoPortalOutletCapability<
    DomPortalOutletCapability
> = () =>
    mono(
        ({ portalOutlet }) =>
            portalOutlet &&
            tube(disposePortalOutlet(), outletElementRemove())({ portalOutlet })
    );

export const outletElementRemove: MonoPortalOutletCapability<
    Required<DomPortalOutletCapability>
> = () => mono(({ portalOutlet }) => portalOutlet.outletElement?.remove());
