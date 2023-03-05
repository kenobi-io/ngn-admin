import { Bounden } from '@core-template';

import { casting } from '../../../../directive';
import { OverlayRef } from '../../../data';

export type DisposeBackdropAttach<T> = Bounden<
    OverlayRef<T>,
    'backdropClickHandler' | 'backdropTransitionendHandler'
>;

/** Cleans up the overlay from the DOM. */
export const backdropDisposeOverlayRef = <T>(
    use: DisposeBackdropAttach<T>
): OverlayRef<T> => {
    return casting(use, () => {
        const { backdrop, backdropClickHandler, backdropTransitionendHandler } =
            use;
        if (backdrop) {
            backdrop.removeEventListener('click', backdropClickHandler);
            backdrop.removeEventListener(
                'transitionend',
                backdropTransitionendHandler
            );
            backdrop.remove();
            // It is possible that a new portal has been attached to this overlay since we started
            // removing the backdrop. If that is the case, only clear the backdrop reference if it
            // is still the same instance that we started to remove.
            if (use.backdropElement === backdrop) {
                use.backdropElement = undefined;
            }
        }
        if (use.backdropTimeout) {
            clearTimeout(use.backdropTimeout);
            use.backdropTimeout = undefined;
        }
    });
};
