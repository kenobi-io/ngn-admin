/* eslint-disable @typescript-eslint/no-explicit-any */
import { OptionsOpenPopover } from '../../data';

export const instanceOfOptionsOpenPopover = <T>(
    object: any
): object is OptionsOpenPopover<T> => {
    return 'origin' in object;
};
