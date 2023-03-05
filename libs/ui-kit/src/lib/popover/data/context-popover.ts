import { Context } from '@ngn-template/cdk';

import { CloseFireUsePopover, OpenFireUsePopover } from '../interactions';

export interface ContextPopover<T> extends Context<T> {
    $implicit: T;
    close: CloseFireUsePopover;
    open: OpenFireUsePopover;
}
