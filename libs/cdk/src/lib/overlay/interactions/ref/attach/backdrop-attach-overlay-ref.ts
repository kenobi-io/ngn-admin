import { Bounden } from '@core-template';
import { outZone } from '@ngn-template/cdk';

import { casting } from '../../../../directive';
import { OverlayRef } from '../../../data';
import { toggleClassesOverlayRef } from './toggle-classes-overlay-ref';

export type BackdropAttach<T> = Bounden<
    OverlayRef<T>,
    'backdropClickHandler' | 'backdropElement' | 'document' | 'ngZone'
>;

/** Attaches a backdrop for this overlay. */
export const backdropAttachOverlayRef = <T>(
    use: BackdropAttach<T>
): OverlayRef<T> => {
    return casting(use, () => {
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

        if (config?.backdropClass) {
            use.toggleClasses = config.backdropClass;
            const tca = { ...use, isAdd: true };
            toggleClassesOverlayRef(tca);
        }

        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        host?.parentElement?.insertBefore(backdropElement, host);

        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        outZone(ngZone, () =>
            backdropElement.addEventListener('click', backdropClickHandler)
        );

        // Add class to fade-in the backdrop after one frame.
        if (
            !animationsDisabled &&
            typeof requestAnimationFrame !== 'undefined'
        ) {
            outZone(ngZone, () => {
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
