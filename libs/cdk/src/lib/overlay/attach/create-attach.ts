import { Direction, Directionality } from '@angular/cdk/bidi';
import { OutBounden } from '@core-template';
import { take } from 'rxjs';

import { using } from '../../directive';
import { Attach } from './attach';
import { backdropAttach } from './backdrop-attach';
import { detachAttach } from './detach-attach';
import { disposeAttach } from './dispose-attach';
import { hasAttached } from './has-attached';
import { setDirectionAttach } from './set-direction-attach';
import { updateElementSizeAttach } from './update-element-size-attach';

export type CreateAttach<T> = OutBounden<
    Attach<T>,
    | 'attachResult'
    | 'backdrop'
    | 'detachmentResult'
    | 'direction'
    | 'panelClass'
    | 'sizeConfig'
    | 'strategy'
    | 'toggleClasses'
    | 'toggleDirection'
    | 'togglePositionStrategy'
    | 'animationsDisabled'
    | 'backdropTimeout'
    | 'previousHostParent'
    | 'positionStrategy'
    | 'scrollStrategy'
>;

/**
 * Attaches content, given via a Portal, to the overlay.
 * If the overlay is configured to have a backdrop, it will be created.
 *
 * @param use Portal instance to which to attach the overlay.
 * @returns The portal attachment result.
 */
export const createAttach = <T>(use: CreateAttach<T>): Attach<T> => {
    const {
        attachments,
        config,
        direction,
        host,
        keyboardDispatcher,
        location,
        ngZone,
        outsideClickDispatcher,
        pane,
        portal,
        portalOutlet,
    } = use;
    return using(use, () => {
        use.attachResult = portalOutlet.attach(portal);
        !host.parentElement && use.previousHostParent?.appendChild(host);
        use.positionStrategy?.attach(use);
        // Insert the host into the DOM before attaching the portal, otherwise
        // the animations module will skip animations on repeat attachments.
        /**
         * Updates the stacking order of the element, moving it to the top if necessary.
         * This is required in cases where one overlay was detached, while another one,
         * that should be behind it, was destroyed. The next time both of them are opened,
         * the stacking will be wrong, because the detached element's pane will still be
         * in its original DOM position.
         */
        host.nextSibling && host.parentNode?.appendChild(host);
        updateElementSizeAttach(use);
        setDirectionAttach(use);
        const ltrOrRtl =
            direction instanceof Directionality
                ? direction.value
                : (direction as Direction);
        host.setAttribute('dir', ltrOrRtl);
        use.scrollStrategy?.enable();
        // Update the position once the ngZone is stable so that the overlay will be fully rendered
        // before attempting to position it, as the position may depend on the size of the rendered
        // content.
        ngZone.onStable.pipe(take(1)).subscribe(() => {
            // The overlay could've been detached before the ngZone has stabilized.
            if (portalOutlet.hasAttached()) {
                use.positionStrategy?.apply();
            }
        });
        pane.style.pointerEvents = 'none';
        config.hasBackdrop && backdropAttach(use);
        attachments.next();
        keyboardDispatcher.add(use);
        config.disposeOnNavigation &&
            (use.locationChanges = location.subscribe(() =>
                disposeAttach(use)
            ));
        outsideClickDispatcher.add(use);
        // TODO(crisbeto): the null check is here, because the portal outlet returns `any`.
        // We should be guaranteed for the result to be `ComponentRef | EmbeddedViewRef`, but
        // `instanceof EmbeddedViewRef` doesn't appear to work at the moment.
        if (typeof use.attachResult?.onDestroy === 'function') {
            // In most cases we control the portal and we know when it is being detached so that
            // we can finish the disposal process. The exception is if the user passes in a custom
            // `ViewContainerRef` that isn't destroyed through the overlay API. Note that we use
            // `detach` here instead of `dispose`, because we don't know if the user intends to
            // reattach the overlay at a later point. It also has the advantage of waiting for animations.
            use.attachResult.onDestroy(() => {
                if (hasAttached(portalOutlet)) {
                    // We have to delay the `detach` call, because detaching immediately prevents
                    // other destroy hooks from running. This is likely a framework bug similar to
                    // https://github.com/angular/angular/issues/46119
                    ngZone.runOutsideAngular(() =>
                        Promise.resolve().then(() => detachAttach(use))
                    );
                }
            });
        }
    });
};
