import { ContainerOverlay } from '../data';
import { bodyContainerOverlay } from './container';

/**
 * This method returns the overlay container element. It will lazily
 * create the element the first time it is called to facilitate using
 * the container in non-browser environments.
 * @returns the container element
 */
export const setContainerBodyOverlay = (
    containerOverlay: ContainerOverlay
): ContainerOverlay => {
    if (!containerOverlay.body) {
        bodyContainerOverlay(containerOverlay);
    }

    return containerOverlay;
};
