import { capability, condition, has, mono, then, tube } from '@core-template';

import {
    DetachDispatcherOverlay,
    KeyboardDispatcherOverlay,
    OutsideClickDispatcherOverlay,
    OverlayCapability,
    OverReqOC,
    ParamsMonoOverlayCapability,
    ReqOC,
} from '../../../data';
import { removeDispatcherOverlay } from './remove-dispatcher-overlay';

type DisOverReqOC = OverReqOC & {
    overlay: {
        dispatcherOverlay:
            | KeyboardDispatcherOverlay
            | OutsideClickDispatcherOverlay;
    };
};

/** Add a new overlay to the list of attached overlay refs. */
export const addDispatcherOverlay: ParamsMonoOverlayCapability<
    OverlayCapability,
    DetachDispatcherOverlay
> = (detach) =>
    mono(
        ({ overlay }) =>
            overlay &&
            tube(
                condition<ReqOC>(
                    ({ overlay: { dispatcherOverlay } }) =>
                        !!(
                            dispatcherOverlay?.attachedOverlay &&
                            dispatcherOverlay?.attachedOverlays
                        )
                ),
                then(
                    removeDispatcherOverlay<OverlayCapability, OverReqOC>(
                        detach
                    ),
                    // Ensure that we don't get the same overlay multiple times.
                    has('dispatcherOverlay'),
                    mono<DisOverReqOC>(
                        ({
                            overlay: {
                                dispatcherOverlay: {
                                    attachedOverlay,
                                    attachedOverlays,
                                },
                            },
                        }) =>
                            attachedOverlay &&
                            attachedOverlays?.push(attachedOverlay)
                    )
                )
            )(capability<OverReqOC>(overlay))
    );
