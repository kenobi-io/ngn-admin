import { Bounden } from '@core-template';

import { using } from '../../directive';
import { Attach } from './attach';

export type UpdatePositionAttach<T> = Bounden<Attach<T>, 'positionStrategy'>;

/** Updates the position of the overlay based on the position strategy. */
export const updatePositionAttach = <T>(
    use: UpdatePositionAttach<T>
): Attach<T> => {
    return using(use, () => use.positionStrategy?.apply());
};
