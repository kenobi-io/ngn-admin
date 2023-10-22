import { Finish, has, mono, returned, tube, unary1 } from '@core-template';
import { UnaryFunction } from 'rxjs';

import { outNgZone } from '../../../../platform';
import { OverlayCapability } from '../../../data';
import { backdropDisposeOverlay } from './backdrop-dispose-overlay';
// import { backdropDisposeOverlay } from './backdrop-dispose-overlay';

type MonoOverlayCapability<
    P extends OverlayCapability | unknown,
    R extends OverlayCapability,
> = () => UnaryFunction<P, R>;

type BackdropDetachOverlay = MonoOverlayCapability<
    OverlayCapability,
    OverlayCapability
>;

type ROC = Required<OverlayCapability>;

/** Detaches the backdrop (if any) associated with the overlay. */
export const backdropDetachOverlay: BackdropDetachOverlay = <
    P extends OverlayCapability,
    R,
>(
    finish?: Finish
) =>
    unary1<P, R>(
        ({ overlay }) =>
            overlay &&
            tube(
                has<ROC>('not', 'overlay.backdropElement'),
                returned(),
                has<ROC>('overlay.animationsDisabled'),
                backdropDisposeOverlay<ROC, ROC>(finish),
                mono<ROC>(
                    ({ overlay: { backdropElement } }) =>
                        backdropElement?.classList.remove(
                            'cdk-overlay-backdrop-showing'
                        )
                ),
                outNgZone<ROC, ROC>(
                    mono(
                        ({
                            overlay: {
                                backdropElement,
                                backdropTransitionendHandler,
                            },
                        }) => {
                            backdropElement?.addEventListener(
                                'transitionend',
                                backdropTransitionendHandler
                            );
                        }
                    )
                ),
                // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
                // In this case we make it unclickable and we try to remove it after a delay.
                mono<ROC>(
                    ({ overlay: { backdropElement } }) =>
                        backdropElement &&
                        (backdropElement.style.pointerEvents = 'none')
                ),
                // Run this outside the Angular ngZone because there's nothing that Angular cares about.
                // If it were to run inside the Angular ngZone, every test that used Overlay would have to be
                // either async or fakeAsync.
                outNgZone(backdropDisposeOverlay(), {
                    func: setTimeout,
                    params: [500],
                })
            )({ overlay }),
        finish
    );
