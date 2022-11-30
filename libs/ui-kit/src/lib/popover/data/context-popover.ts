import { Context } from '@ngn-template/access';

import { ClosePopover, OpenPopover } from '../interactions';

export interface ContextPopover<T> extends Context<T> {
    close: ClosePopover;
    open: OpenPopover;
}
