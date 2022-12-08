import { Bounden } from '@core-template';

import { using } from '../directive';
import { Attach } from './attach/attach';

export type SetDirectionOverlayRef<T> = Bounden<
    Attach<T>,
    'host' | 'toggleDirection'
>;

/** Sets the LTR/RTL direction for the overlay. */
export const setDirectionOverlayRef = <T>(
    use: SetDirectionOverlayRef<T>
): Attach<T> => {
    const { host, toggleDirection } = use;
    return using(use, () => {
        use.direction = toggleDirection;
        if (!use.direction) {
            use.direction = 'ltr';
        }
        use.direction =
            typeof use.direction === 'string'
                ? use.direction
                : use.direction.value;
        host.setAttribute('dir', use.direction);
    });
};
