import { Bounden } from '@core-template';

import { using } from '../../directive';
import { Attach } from './attach';
import { disposeBackdropAttach } from './dispose-backdrop-attach';

export type DetachBackdropAttach<T> = Bounden<
    Attach<T>,
    | 'backdropClickHandler'
    | 'backdropTransitionendHandler'
    | 'backdropElement'
    | 'ngZone'
>;

/** Detaches the backdrop (if any) associated with the overlay. */
export const detachBackdropAttach = <T>(
    use: DetachBackdropAttach<T>
): Attach<T> => {
    return using(use, () => {
        const {
            animationsDisabled,
            backdropElement,
            backdropTransitionendHandler,
            ngZone,
        } = use;
        const backdropToDetach = backdropElement;

        if (!backdropToDetach) {
            return;
        }

        if (animationsDisabled) {
            disposeBackdropAttach(use);
            return;
        }
        backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
        ngZone.runOutsideAngular(() => {
            backdropToDetach?.addEventListener(
                'transitionend',
                backdropTransitionendHandler
            );
        });
        // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
        // In this case we make it unclickable and we try to remove it after a delay.
        backdropToDetach.style.pointerEvents = 'none';
        // Run this outside the Angular ngZone because there's nothing that Angular cares about.
        // If it were to run inside the Angular ngZone, every test that used Overlay would have to be
        // either async or fakeAsync.
        use.backdropTimeout = ngZone.runOutsideAngular(() =>
            setTimeout(() => {
                disposeBackdropAttach(use);
            }, 500)
        );
    });
};
