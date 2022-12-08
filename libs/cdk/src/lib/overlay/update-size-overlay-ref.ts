import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Bounden } from '@core-template';

import { using } from '../directive';
import { Attach } from './attach/attach';

export type UpdateSizeOverlayRef<T> = Bounden<Attach<T>, 'pane' | 'sizeConfig'>;

/** Update the size properties of the overlay. */
export const updateSizeOverlayRef = <T>(
    use: UpdateSizeOverlayRef<T>
): Attach<T> => {
    return using(use, () => {
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
