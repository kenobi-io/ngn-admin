import { Bounden } from '@core-template';

import { using } from '../../directive';
import { Attach } from './attach';

export type DisposeBackdropAttach<T> = Bounden<
    Attach<T>,
    'backdropClickHandler' | 'backdropTransitionendHandler'
>;

/** Cleans up the overlay from the DOM. */
export const disposeBackdropAttach = <T>(
    use: DisposeBackdropAttach<T>
): Attach<T> => {
    return using(use, () => {
        const { backdropClickHandler, backdropTransitionendHandler } = use;
        if (use.backdrop) {
            use.backdrop.removeEventListener('click', backdropClickHandler);
            use.backdrop.removeEventListener(
                'transitionend',
                backdropTransitionendHandler
            );
            use.backdrop.remove();
            // It is possible that a new portal has been attached to this overlay since we started
            // removing the backdrop. If that is the case, only clear the backdrop reference if it
            // is still the same instance that we started to remove.
            if (use.backdropElement === use.backdrop) {
                use.backdropElement = undefined;
            }
        }
        if (use.backdropTimeout) {
            clearTimeout(use.backdropTimeout);
            use.backdropTimeout = undefined;
        }
    });
};
