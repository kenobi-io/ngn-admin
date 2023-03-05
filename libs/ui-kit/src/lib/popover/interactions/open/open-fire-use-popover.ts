import { changes } from '@ngn-template/cdk';

import { FireUsePopover } from '../../data';
import { processOpen } from './process-open';

export type OpenFireUsePopover = {
    <T>(change?: Partial<FireUsePopover<T>>): FireUsePopover<T>;
};

export const openFireUsePopover: OpenFireUsePopover = function <T>(
    this: FireUsePopover<T>,
    change?: Partial<FireUsePopover<T>>
): FireUsePopover<T> {
    changes(this, change);
    return processOpen(this);
};
