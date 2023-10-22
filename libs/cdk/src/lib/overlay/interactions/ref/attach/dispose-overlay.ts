/* eslint-disable @typescript-eslint/no-explicit-any */
import { capability, mono, tube, unary } from '@core-template';
import { UnaryFunction } from 'rxjs';

import {
    disposePortalOutlet,
    PortalOutletCapability,
} from '../../../../portal';
import { StrategyScrollCapability } from '../../../../scroll';
import {
    DetachDispatcherOverlay,
    // MonoOverlayCapability,
    Overlay,
    OverlayCapability,
    ParamsMonoOverlayCapability,
} from '../../../data';
import {
    detachKeyboardDispatcherOverlay,
    detachOutsideClickDispatcherOverlay,
    removeDispatcherOverlay,
} from '../../dispatcher';
import { backdropDisposeOverlay } from './backdrop-dispose-overlay';
import {
    disposeStrategyScrollOverlay,
    FnsScrollStrategy,
    ParamsFnsScrollStrategy,
} from './dispose-scroll-strategy-overlay';

type ParamsHasPortalOutlet = {
    hasPortalOutlet?: boolean;
};

// type MRO<T = unknown> = MonoOverlayCapability<
//     Required<OverlayCapability<T>> & Overlay<T>
// >;

type PRO<T = unknown> = ParamsMonoOverlayCapability<
    Required<OverlayCapability<T>> & Overlay<T>,
    ParamsHasPortalOutlet
>;

type Data<T = unknown> = Overlay<T> & Required<OverlayCapability<T>>;

/** Cleans up the overlay from the DOM. */
export const disposeOverlay: ParamsMonoOverlayCapability<
    OverlayCapability,
    ParamsFnsScrollStrategy & ParamsHasPortalOutlet
> = ({ fnsScrollStrategy, hasPortalOutlet = false }) =>
    mono(({ overlay }) => {
        const po = { hasPortalOutlet };
        overlay &&
            tube(
                // positionStrategy?.dispose();,
                setHasPortalOutlet(po),
                disposeStrategyScrollOverlay<
                    Data,
                    StrategyScrollCapability,
                    FnsScrollStrategy
                >(fnsScrollStrategy),
                backdropDisposeOverlay<StrategyScrollCapability, Data>(),
                disposePositionStrategy<Data>(),
                removeDispatcherOverlay<
                    Data,
                    OverlayCapability,
                    DetachDispatcherOverlay
                >(detachKeyboardDispatcherOverlay),
                disposePortalOutlet<
                    OverlayCapability,
                    PortalOutletCapability
                >(),
                eventsComplete<PortalOutletCapability, OverlayCapability>(),
                removeDispatcherOverlay<
                    OverlayCapability,
                    OverlayCapability,
                    DetachDispatcherOverlay
                >(detachOutsideClickDispatcherOverlay),
                removeAndClearHost(),
                detachmentsNextAndComplete(po)
            )(capability<Data>(overlay));
    });

const setHasPortalOutlet: PRO = ({ hasPortalOutlet }) =>
    mono(
        ({ overlay: { portalOutlet } }) =>
            (hasPortalOutlet = !!portalOutlet) && hasPortalOutlet
    );

// const covariance = <P, R>(): UnaryFunction<P, R> => unary<P, R>((_) => _);

const disposePositionStrategy = <
    P,
    R extends OverlayCapability = Data,
>(): UnaryFunction<P, R> =>
    unary<P, R>(({ overlay: { locationChanges } }: any) => {
        // overlay?.positionStrategy?.dispose();
        locationChanges.unsubscribe();
    });

const eventsComplete = <P, R extends OverlayCapability = Data>(): UnaryFunction<
    P,
    R
> =>
    unary<P, R>(
        ({
            overlay: {
                attachments,
                backdropClick,
                keydownEvents,
                outsidePointerEvents,
            },
        }: any) => {
            attachments.complete();
            backdropClick.complete();
            keydownEvents?.complete();
            outsidePointerEvents?.complete();
        }
    );

const removeAndClearHost = <
    P = Data,
    R extends OverlayCapability = Data,
>(): UnaryFunction<P, R> =>
    unary<P, R>(({ overlay: { host, pane, previousHostParent } }: any) => {
        host?.remove();
        previousHostParent = pane = host = undefined;
        return { pane, previousHostParent }; // only for disable ts rule
    });

const detachmentsNextAndComplete: PRO = ({ hasPortalOutlet }) =>
    mono(({ overlay: { detachments } }) => {
        if (hasPortalOutlet) {
            detachments.next();
        }
        detachments.complete();
    });
