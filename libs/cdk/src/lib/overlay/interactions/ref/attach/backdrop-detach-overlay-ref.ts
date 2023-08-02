import { mono } from '@core-template';
import { outZone } from '@ngn-template/cdk';
import { UnaryFunction } from 'rxjs';

import { OverlayRefCapability } from '../../../data';
import { backdropDisposeOverlayRef } from './backdrop-dispose-overlay-ref';

type BackdropDetachOverlayRef = <
    T,
    R,
    P extends OverlayRefCapability<T> = OverlayRefCapability<T>
>() => UnaryFunction<P, R>;

/** Detaches the backdrop (if any) associated with the overlay. */
export const backdropDetachOverlayRef: BackdropDetachOverlayRef = () =>
    mono(({ overlayRef }) => {
        const {
            animationsDisabled,
            backdropElement,
            backdropTransitionendHandler,
            ngZone,
        } = overlayRef;
        const backdropToDetach = backdropElement;

        if (!backdropToDetach) {
            return;
        }

        if (animationsDisabled) {
            backdropDisposeOverlayRef(overlayRef);
            return;
        }
        backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
        outZone(ngZone, () => {
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
        overlayRef.backdropTimeout = outZone(ngZone, () =>
            setTimeout(() => {
                backdropDisposeOverlayRef(overlayRef);
            }, 500)
        );
    });
