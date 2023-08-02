/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CapabilityMono,
    Condition,
    SplicerTube,
    condition,
    includes,
    indexOf,
    mono,
    splice,
    then,
    tube,
} from '@core-template';
import { UnaryFunction } from 'rxjs';

import {
    KeyboardDispatcherOverlay,
    KeyboardDispatcherOverlayCapability,
    OutsideClickDispatcherOverlay,
    OutsideClickDispatcherOverlayCapability,
} from '../../../data';

export type ExEventDispatcherOverlay<T> =
    | Partial<OutsideClickDispatcherOverlay & SplicerTube<T>>
    | Partial<KeyboardDispatcherOverlay & SplicerTube<T>>;

export type Out<T> = OutsideClickDispatcherOverlayCapability & SplicerTube<T>;
export type Key<T> = KeyboardDispatcherOverlayCapability & SplicerTube<T>;
type OutKey<T> = Out<T> | Key<T>;
type DetachCapabilityUnary<T, DispatcherOverlay> = CapabilityMono<
    DispatcherOverlay & Partial<SplicerTube<T>>
>;

type Detach<T> = DetachCapabilityUnary<
    T,
    OutsideClickDispatcherOverlay | KeyboardDispatcherOverlay
>;
type Return<T, R> = UnaryFunction<Partial<Out<T> | Key<T>>, R>;

type RemoveDispatcherOverlay = <T, R, P extends OutKey<T> = OutKey<T>>(
    detach: Detach<T>
) => Return<P, R>;

/** Remove an overlay from the list of attached overlay refs. */
export const removeDispatcherOverlay: RemoveDispatcherOverlay = <
    T,
    R,
    P extends OutKey<T>
>(
    detach: Detach<T>
) =>
    mono<P, R>(({ dispatcher }) => {
        if (dispatcher) {
            const { attachedOverlay, attachedOverlays } = dispatcher;
            tube(
                hasAttached(),
                then(
                    indexOf(attachedOverlays, attachedOverlay),
                    includes(attachedOverlays, attachedOverlay),
                    splice(attachedOverlays, undefined, 1),
                    // Remove the global listener once there are no more overlays.
                    isEqual0LengthAttached(),
                    detach()
                )
            )(dispatcher);
        }
    });

const hasAttached = <T>(): Condition<ExEventDispatcherOverlay<T>> =>
    condition(
        (dispatcher) =>
            !!(dispatcher?.attachedOverlays && dispatcher?.attachedOverlay)
    );

const isEqual0LengthAttached = <T>(): Condition<ExEventDispatcherOverlay<T>> =>
    condition((dispatcher) => !!(dispatcher?.attachedOverlays?.length === 0));
