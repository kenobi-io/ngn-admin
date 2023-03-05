import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

import { changes, PLATFORM_TOKEN } from '../../../platform';
import { ContainerOverlay } from '../../data';
import { bodyContainerOverlay } from './body-container-overlay';

export const CHANGE_CONTAINER_OVERLAY = new InjectionToken<ContainerOverlay>(
    '[CHANGE_CONTAINER_OVERLAY]'
);

/**
 * Create the overlay container element, which is simply a div
 * with the 'cdk-overlay-container' class on the document body.
 */
export const createContainerOverlay = (
    change?: Partial<ContainerOverlay>
): ContainerOverlay => {
    const containerOverlay: ContainerOverlay = {
        document: inject(DOCUMENT),
        platform: inject(PLATFORM_TOKEN),
    };
    bodyContainerOverlay(containerOverlay);
    changes(containerOverlay, change, CHANGE_CONTAINER_OVERLAY);

    return containerOverlay;
};

export const CONTAINER_OVERLAY = new InjectionToken<ContainerOverlay>(
    '[CONTAINER_OVERLAY]',
    {
        factory: () => createContainerOverlay(),
    }
);
