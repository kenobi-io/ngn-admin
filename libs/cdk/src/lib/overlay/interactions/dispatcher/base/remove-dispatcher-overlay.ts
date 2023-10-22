import {
    and,
    capability,
    condition,
    has,
    includes,
    indexOf,
    splice,
    SplicerTube,
    then,
    tube,
    unary,
} from '@core-template';
import { UnaryFunction } from 'rxjs';

import {
    DetachDispatcherOverlay,
    Overlay,
    OverlayCapability,
    ReqOC,
} from '../../../data';

type Input<T = unknown> = OverlayCapability<T> &
    Partial<
        Overlay<T> &
            SplicerTube<T> & {
                attachedOverlaysProp: string;
                attachedOverlayProp: keyof Overlay | ;
                dispatcherOverlayProp: string;
            }
    >;

/** Remove an overlay from the list of attached overlay refs. */
export const removeDispatcherOverlay /* : ParamsMonoOverlayCapability<
    OverlayCapability & { prop?: string },
    DetachDispatcherOverlay
> =  */ = <
    P extends Input,
    R extends OverlayCapability = OverlayCapability,
    Param extends DetachDispatcherOverlay = DetachDispatcherOverlay,
>(
    detach: Param
): UnaryFunction<P, R> =>
    unary<P, R>(
        ({
            attachedOverlayProp = 'dispatcherOverlay.attachedOverlay',
            attachedOverlaysProp = 'dispatcherOverlay.attachedOverlays',
            dispatcherOverlayProp = 'dispatcherOverlay',
            index,
            overlay,
        }: P) =>
            overlay?.dispatcherOverlay &&
            tube(
                and(
                    has<Input>([dispatcherOverlayProp]),
                    has<Input>([attachedOverlaysProp, attachedOverlayProp])
                ),
                then(
                    indexOf(
                        attachedOverlaysProp,
                        overlay.dispatcherOverlay.attachedOverlay
                    ),
                    includes(
                        attachedOverlaysProp,
                        overlay.dispatcherOverlay.attachedOverlay
                    ),
                    splice(attachedOverlaysProp, index, 1),
                    // Remove the global listener once there are no more overlays.
                    condition<ReqOC>(
                        ({ overlay: { dispatcherOverlay } }) =>
                            !!(
                                dispatcherOverlay?.attachedOverlays?.length ===
                                0
                            )
                    ),
                    detach()
                )
            )(capability<Input>(overlay))
    );

// const hasAttached: ConReqOverCap = () =>
//     condition(
//         ({ overlay: { dispatcherOverlay } }) =>
//             !!(
//                 dispatcherOverlay?.attachedOverlays &&
//                 dispatcherOverlay.attachedOverlay
//             )
//     );

// const isEqual0LengthAttached: ConReqOverCap = () =>
//     condition(
//         ({ overlay: { dispatcherOverlay } }) =>
//             !!(dispatcherOverlay?.attachedOverlays?.length === 0)
//     );
