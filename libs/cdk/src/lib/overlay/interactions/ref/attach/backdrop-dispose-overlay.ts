import { Finish, has, mono, tube, unary } from '@core-template';
import { UnaryFunction } from 'rxjs';

import { MonoOverlayCapability, OverlayCapability } from '../../../data';

type MRO = MonoOverlayCapability<Required<OverlayCapability>>;

/** Cleans up the overlay from the DOM. */
export const backdropDisposeOverlay /* : MonoOverlayCapability<
    OverlayCapability
> = () =>
    mono( */ = <P, R extends OverlayCapability>(
    finish?: Finish
): UnaryFunction<P, R> =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    unary<P, R>(({ overlay }: any) => {
        overlay &&
            tube(
                removeEventListeners(),
                mono(({ overlay: { backdrop } }) => {
                    backdrop?.remove();
                }),
                clearBackdropReference(),
                clearBackdropTimeout()
            )({ overlay });
    }, finish);

const removeEventListeners: MRO = () =>
    mono(
        ({
            overlay: {
                backdrop,
                backdropClickHandler,
                backdropTransitionendHandler,
            },
        }) => {
            if (backdrop) {
                backdrop.removeEventListener('click', backdropClickHandler);
                backdrop.removeEventListener(
                    'transitionend',
                    backdropTransitionendHandler
                );
            }
        }
    );

const clearBackdropReference: MRO = () =>
    mono(({ overlay: { backdrop, backdropElement } }) => {
        if (backdrop && backdropElement === backdrop) {
            backdropElement = undefined;
        }
    });

const clearBackdropTimeout: MRO = () =>
    mono(({ overlay: { backdropTimeout } }) => {
        if (has(backdropTimeout)) {
            clearTimeout(backdropTimeout);
            backdropTimeout = undefined;
        }
    });
