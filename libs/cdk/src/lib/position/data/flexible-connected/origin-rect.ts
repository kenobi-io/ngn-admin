import { ElementRef } from '@angular/core';

import { FlexibleConnectedStrategyPosition as Fcsp } from './flexible-connected-strategy-position';

/** @internal Returns the ClientRect of the current origin. */
export const originRect = <T>(strategyPosition: Fcsp<T>): Fcsp<T> => {
    const { origin } = strategyPosition;

    if (origin instanceof ElementRef) {
        strategyPosition.originRect =
            origin.nativeElement.getBoundingClientRect();
        return strategyPosition;
    }

    // Check for Element so SVG elements are also supported.
    if (origin instanceof Element) {
        strategyPosition.originRect = origin.getBoundingClientRect();
        return strategyPosition;
    }
    const width = origin.width || 0;
    const height = origin.height || 0;
    // If the origin is a point, return a client rect as if it was a 0x0 element at the point.
    strategyPosition.originRect = {
        bottom: origin.y + height,
        height,
        left: origin.x,
        right: origin.x + width,
        top: origin.y,
        width,
    };

    return strategyPosition;
};
