import { UsePopover } from '../../data';
import { FireUsePopover } from '../../data/fire-use-popover';
import { processOpen } from './process-open';

export type OpenPopover = {
    <T>(use: FireUsePopover<T>): UsePopover<T>;
};

export const openPopover: OpenPopover = function <T>(
    this: FireUsePopover<T>,
    use?: FireUsePopover<T>
): UsePopover<T> {
    return use ? processOpen(use) : processOpen(this);
};
