import { changes, disposeOverlayRef } from '@ngn-template/cdk';

import { FireUsePopover } from '../data';

export type CloseFireUsePopover = {
    <T>(change?: Partial<FireUsePopover<T>>): FireUsePopover<T>;
};

export const closeFireUsePopover: CloseFireUsePopover = function <T>(
    this: FireUsePopover<T>,
    change?: Partial<FireUsePopover<T>>
): FireUsePopover<T> {
    changes(this, change);
    const { afterClosed, closeEventKind, data, overlay } = this;
    overlay && disposeOverlayRef(overlay.ref);
    data &&
        afterClosed?.next({
            closeEventKind,
            data,
        });
    afterClosed?.complete();
    return this;
};
