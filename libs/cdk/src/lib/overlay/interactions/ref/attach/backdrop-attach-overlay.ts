import { mono } from '@core-template';

import { outZone } from '../../../../platform';
import { MonoOverlayCapability } from '../../../data';
import { toggleClassesOverlayRef } from './toggle-classes-overlay';

/** Attaches a backdrop for this overlay. */
export const backdropAttachOverlayRef: MonoOverlayCapability = () =>
    mono(({ overlay }) => {
        if (overlay) {
            const {
                animationsDisabled,
                backdropClickHandler,
                config,
                document,
                host,
                ngZone,
            } = overlay;
            const showingClass = 'cdk-overlay-backdrop-showing';
            overlay.backdropElement = document.createElement('div');
            overlay.backdropElement.classList.add('cdk-overlay-backdrop');
            const { backdropElement } = overlay;

            if (animationsDisabled) {
                backdropElement.classList.add(
                    'cdk-overlay-backdrop-noop-animation'
                );
            }

            if (config?.backdropClass) {
                overlay.toggleClasses = config.backdropClass;
                const tca = { ...overlay, isAdd: true };
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
        }
    });
