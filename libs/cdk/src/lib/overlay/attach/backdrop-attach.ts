import { Bounden } from '@core-template';

import { using } from '../../directive';
import { Attach } from './attach';
import { toggleClassesAttach } from './toggle-classes-attach';

export type BackdropAttach<T> = Bounden<
    Attach<T>,
    | 'backdropClickHandler'
    | 'backdropElement'
    | 'document'
    | 'config'
    | 'host'
    | 'ngZone'
>;

/** Attaches a backdrop for this overlay. */
export const backdropAttach = <T>(use: BackdropAttach<T>): Attach<T> => {
    return using(use, () => {
        const {
            animationsDisabled,
            backdropClickHandler,
            config,
            document,
            host,
            ngZone,
        } = use;
        const showingClass = 'cdk-overlay-backdrop-showing';
        use.backdropElement = document.createElement('div');
        use.backdropElement.classList.add('cdk-overlay-backdrop');
        const { backdropElement } = use;

        if (animationsDisabled) {
            backdropElement.classList.add(
                'cdk-overlay-backdrop-noop-animation'
            );
        }

        if (config.backdropClass) {
            use.toggleClasses = use.config.backdropClass;
            const tca = { ...use, isAdd: true };
            toggleClassesAttach(tca);
        }

        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        host.parentElement?.insertBefore(backdropElement, host);

        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        backdropElement.addEventListener('click', backdropClickHandler);

        // Add class to fade-in the backdrop after one frame.
        if (
            !animationsDisabled &&
            typeof requestAnimationFrame !== 'undefined'
        ) {
            ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => {
                    if (backdropElement) {
                        backdropElement.classList.add(showingClass);
                    }
                });
            });
        } else {
            backdropElement.classList.add(showingClass);
        }
    });
};
