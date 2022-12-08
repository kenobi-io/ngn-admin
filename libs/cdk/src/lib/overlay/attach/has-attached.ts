import { PortalOutlet } from '@angular/cdk/portal';

/** Whether the overlay has attached content. */
export const hasAttached = (portalOutlet: PortalOutlet): boolean => {
    return portalOutlet.hasAttached();
};
