import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Bounden } from '@core-template';

import { using } from '../../directive';
import { Attach } from './attach';

export type UpdateElementSizeAttach<T> = Bounden<Attach<T>, 'pane' | 'config'>;

export const updateElementSizeAttach = <T>(
    use: UpdateElementSizeAttach<T>
): Attach<T> => {
    return using(use, () => {
        const { config, pane } = use;
        if (pane) {
            const style = pane.style;
            style.width = coerceCssPixelValue(config.width);
            style.height = coerceCssPixelValue(config.height);
            style.minWidth = coerceCssPixelValue(config.minWidth);
            style.minHeight = coerceCssPixelValue(config.minHeight);
            style.maxWidth = coerceCssPixelValue(config.maxWidth);
            style.maxHeight = coerceCssPixelValue(config.maxHeight);
        }
    });
};
