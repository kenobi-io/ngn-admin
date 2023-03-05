import { take } from 'rxjs';

import { outZone } from '../../../../platform';
import {
    /* attachPortalOutlet,  */ hasAttached,
    PortalOutlet,
} from '../../../../portal';
import { OverlayRef } from '../../../data';
import { addOutsideClickDispatcherOverlay } from '../../dispatcher';
import { addKeyboardDispatcherOverlay } from '../../dispatcher/add-keyboard-dispatcher-overlay';
import { backdropAttachOverlayRef } from './backdrop-attach-overlay-ref';
import { detachOverlayRef } from './detach-overlay-ref';
import { disposeOverlayRef } from './dispose-overlay-ref';
import { setDirectionOverlayRef } from './set-direction-overlay-ref';
import { updateElementSizeOverlayRef } from './update-element-size-overlay-ref';

type RolesAttachOverlayRef = {
    enableScroll: <T>(ref: T) => T;
    attachPortalOutlet: <T>(outlet: PortalOutlet<T>) => PortalOutlet<T>;
    // attachPositionStrategy: <T>(outlet: PositionStrategy<T>) => PositionStrategy<T>;
};

/**
 * Attaches content, given via a Portal, to the overlay.
 * If the overlay is configured to have a backdrop, it will be created.
 *
 * @param overlayRef Portal instance to which to attach the overlay.
 * @returns The portal attachment result.
 */
export const attachOverlayRef = <T>(
    fns: RolesAttachOverlayRef
): ((overlay: OverlayRef<T>) => OverlayRef<T>) => {
    const { attachPortalOutlet, enableScroll } = fns;
    return <T>(overlayRef: OverlayRef<T>): OverlayRef<T> => {
        const {
            attachments,
            config,
            host,
            keyboardDispatcher,
            // kindStrategiesScroll,
            location,
            ngZone,
            outsideClickDispatcher,
            pane,
            portal,
            portalOutlet,
            positionStrategy,
            previousHostParent,
            // strategiesScroll,
        } = overlayRef;
        host &&
            !host.parentElement &&
            previousHostParent &&
            previousHostParent.appendChild(host);
        if (portalOutlet && portal) {
            portalOutlet.portal = portal;
            // portalOutlet.mapStrategyFnsAttach = new 'Map'();
            // portalOutlet.strategyAttachKind = strategyKindPortal;
            // // attachPortalOutlet(portalOutlet);
            attachPortalOutlet(portalOutlet);
            overlayRef.componentEmbeddedRef = portalOutlet.appendedPortal;
            positionStrategy?.attach(overlayRef);
        }
        // Insert the host into the DOM before attaching the portal, otherwise
        // the animations module will skip animations on repeat attachments.
        /**
         * Updates the stacking order of the element, moving it to the top if necessary.
         * This is required in cases where one overlay was detached, while another one,
         * that should be behind it, was destroyed. The next time both of them are opened,
         * the stacking will be wrong, because the detached element's pane will still be
         * in its original DOM position.
         */
        host?.nextSibling && host.parentNode?.appendChild(host);
        updateElementSizeOverlayRef<T>(overlayRef);
        setDirectionOverlayRef(overlayRef);

        // // strategiesScroll?.enable();
        // if (kindStrategiesScroll && strategiesScroll) {
        //     const { /* attachStrategiesScroll, */ enableStrategiesScroll } = {
        //         ...strategiesScroll,
        //     };
        //     const enable = enableStrategiesScroll.get(kindStrategiesScroll);
        //     enable?.(overlayRef);
        enableScroll(overlayRef);

        //     // strategy<OverlayRef<T>>(
        //     //     overlayRef,
        //     //     enableStrategiesScroll,
        //     //     kindStrategiesScroll
        //     // );
        // }

        // Update the position once the ngZone is stable so that the overlay will be fully rendered
        // before attempting to position it, as the position may depend on the size of the rendered
        // content.
        ngZone.onStable.pipe(take(1)).subscribe(() => {
            // The overlay could've been detached before the ngZone has stabilized.
            if (hasAttached(portalOutlet?.portal)) {
                positionStrategy?.apply();
            }
        });
        pane && (pane.style.pointerEvents = 'none');
        config?.hasBackdrop && backdropAttachOverlayRef(overlayRef);
        attachments.next();
        addKeyboardDispatcherOverlay(keyboardDispatcher);
        // keyboardDispatcher.add(use);
        config?.disposeOnNavigation &&
            (overlayRef.locationChanges = location.subscribe(() =>
                disposeOverlayRef(overlayRef)
            ));
        addOutsideClickDispatcherOverlay(outsideClickDispatcher);
        // outsideClickDispatcher.add(use);
        // TODO(crisbeto): the null check is here, because the portal outlet returns `any`.
        // We should be guaranteed for the result to be `ComponentRef | EmbeddedViewRef`, but
        // `instanceof EmbeddedViewRef` doesn't appear to work at the moment.
        const { onDestroy } = overlayRef.componentEmbeddedRef as {
            onDestroy: unknown;
        };
        if (typeof onDestroy === 'function') {
            // In most cases we control the portal and we know when it is being detached so that
            // we can finish the disposal process. The exception is if the user passes in a custom
            // `ViewContainerRef` that isn't destroyed through the overlay API. Note that we use
            // `detach` here instead of `dispose`, because we don't know if the user intends to
            // reattach the overlay at a later point. It also has the advantage of waiting for animations.
            onDestroy(() => {
                if (hasAttached(portalOutlet?.portal)) {
                    // We have to delay the `detach` call, because detaching immediately prevents
                    // other destroy hooks from running. This is likely a framework bug similar to
                    // https://github.com/angular/angular/issues/46119
                    outZone(ngZone, () =>
                        Promise.resolve().then(() =>
                            detachOverlayRef(overlayRef)
                        )
                    );
                }
            });
        }
        return overlayRef;
    };
};
