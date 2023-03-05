import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Bounden } from '@core-template';

import { casting } from '../../../../directive';
import { OverlayRef } from '../../../data';

export type UpdateElementSizeAttach<T> = Bounden<
    OverlayRef<T>,
    'pane' | 'config'
>;

export const updateElementSizeOverlayRef = <T>(
    use: UpdateElementSizeAttach<T>
): OverlayRef<T> => {
    return casting(use, () => {
        const { config, pane } = use;
        if (config && pane) {
            const { style } = pane;
            style.width = coerceCssPixelValue(config.width);
            style.height = coerceCssPixelValue(config.height);
            style.minWidth = coerceCssPixelValue(config.minWidth);
            style.minHeight = coerceCssPixelValue(config.minHeight);
            style.maxWidth = coerceCssPixelValue(config.maxWidth);
            style.maxHeight = coerceCssPixelValue(config.maxHeight);
        }
    });
};
