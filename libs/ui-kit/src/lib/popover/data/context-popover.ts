import { Context } from '@ngn-template/cdk';

import { ClosePopover, OpenPopover } from '../interactions';

export interface ContextPopover<T> extends Context<T> {
    $implicit: T;
    close: ClosePopover;
    open: OpenPopover;
}
