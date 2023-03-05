import { Bounden } from '@core-template';

import { casting } from '../../../../directive';
import { OverlayRef } from '../../../data';

export type SetDirectionAttach<T> = Bounden<OverlayRef<T>, 'config' | 'host'>;

export const setDirectionOverlayRef = <T>(
    use: SetDirectionAttach<T>
): OverlayRef<T> => {
    return casting(use, () => {
        const { config, host } = use;
        if (config && host) {
            use.direction = config.direction;
            if (!use.direction) {
                use.direction = 'ltr';
            }
            use.direction =
                typeof use.direction === 'string'
                    ? use.direction
                    : use.direction.value;
            host.setAttribute('dir', use.direction);
        }
    });
};
