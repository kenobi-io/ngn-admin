import { Bounden } from '@core-template';

import { using } from '../../directive';
import { Attach } from './attach';

export type SetDirectionAttach<T> = Bounden<Attach<T>, 'config'>;

export const setDirectionAttach = <T>(
    use: SetDirectionAttach<T>
): Attach<T> => {
    return using(use, () => {
        use.direction = use.config.direction;
        if (!use.direction) {
            use.direction = 'ltr';
        }
        use.direction =
            typeof use.direction === 'string'
                ? use.direction
                : use.direction.value;
    });
};
