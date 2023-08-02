import { Mono, unary } from '@core-template';

import { OverlayCapability } from '../../data';

/** Whether the we're dealing with an RTL context */
export const isOverlayRefDirectionRtl = <T>({
    overlay,
}: Partial<OverlayCapability<T>>): boolean =>
    overlay ? overlay.overlayRef.direction === 'rtl' : false; // TODO: refactoring by analogy all const { ... } = ...

/** Whether the we're dealing with an RTL context */
export const setRtl = <T>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    isRtl: boolean
): Mono<Partial<OverlayCapability<T>>> =>
    unary(({ overlay }) => {
        if (overlay) {
            isRtl = isOverlayRefDirectionRtl({ overlay });
        }
    });
