import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Bounden } from '@core-template';

import { casting } from '../../../directive';
import { Overlay } from '../../data';

export type UpdateSizeOverlayRef<T> = Bounden<
    Overlay<T>,
    'pane' | 'sizeConfig'
>;

/** Update the size properties of the overlay. */
export const updateSizeOverlayRef = <T>(
    use: UpdateSizeOverlayRef<T>
): Overlay<T> => {
    return casting(use, () => {
        const { pane, sizeConfig } = use;
        // don't calls updateElementSizeAttach because use.config rewrite
        use.config = { ...use.config, ...sizeConfig };
        if (pane) {
            const style = pane.style;
            style.width = coerceCssPixelValue(use.config.width);
            style.height = coerceCssPixelValue(use.config.height);
            style.minWidth = coerceCssPixelValue(use.config.minWidth);
            style.minHeight = coerceCssPixelValue(use.config.minHeight);
            style.maxWidth = coerceCssPixelValue(use.config.maxWidth);
            style.maxHeight = coerceCssPixelValue(use.config.maxHeight);
        }
    });
};
