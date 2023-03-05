import { _isTestEnvironment } from '@angular/cdk/platform';

import { ContainerOverlay } from '../../data';

export const bodyContainerOverlay = (
    containerOverlay: ContainerOverlay
): ContainerOverlay => {
    const { document, platform } = containerOverlay;
    const containerClass = 'cdk-overlay-container';
    // TODO(crisbeto): remove the testing check once we have an overlay testing
    // module or Angular starts tearing down the testing `NgModule`. See:
    // https://github.com/angular/angular/issues/18831
    if (platform.isBrowser || _isTestEnvironment()) {
        const oppositePlatformContainers = document.querySelectorAll(
            `.${containerClass}[platform="server"], ` +
                `.${containerClass}[platform="test"]`
        );
        // Remove any old containers from the opposite platform.
        // This can happen when transitioning from the server to the client.
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < oppositePlatformContainers.length; i++) {
            oppositePlatformContainers[i].remove();
        }
    }
    const containerBody = document.createElement('div');
    containerBody.classList.add(containerClass);
    // A long time ago we kept adding new overlay containers whenever a new app was instantiated,
    // but at some point we added logic which clears the duplicate ones in order to avoid leaks.
    // The new logic was a little too aggressive since it was breaking some legitimate use cases.
    // To mitigate the problem we made it so that only containers from a different platform are
    // cleared, but the side-effect was that people started depending on the overly-aggressive
    // logic to clean up their tests for them. Until we can introduce an overlay-specific testing
    // module which does the cleanup, we try to detect that we're in a test environment and we
    // always clear the container. See #17006.
    // TODO(crisbeto): remove the test environment check once we have an overlay testing module.
    if (_isTestEnvironment()) {
        containerBody.setAttribute('platform', 'test');
    } else if (!platform.isBrowser) {
        containerBody.setAttribute('platform', 'server');
    }

    document.body.appendChild(containerBody);
    containerOverlay.body = containerBody;

    return containerOverlay;
};
