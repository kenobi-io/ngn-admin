import { Portal } from '../data';

/** Whether the overlay has attached content. */
export const hasAttached = (portal: Portal | undefined): boolean => {
    return portal ? portal.isAttached : false;
};
