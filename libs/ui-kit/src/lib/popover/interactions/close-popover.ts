import { Bounden } from '@core-template';

import { UsePopover } from '../data';
import { FireUsePopover } from '../data/fire-use-popover';

export type CloseContentUsePopover<T> = Bounden<
    FireUsePopover<T>,
    'afterClosed' | 'closeEventKind' | 'data' | 'overlayRef'
>;

export type ClosePopover = <T>(use: CloseContentUsePopover<T>) => UsePopover;

const processClose = <T>(use: CloseContentUsePopover<T>): UsePopover => {
    const { afterClosed, closeEventKind, data, overlayRef } = use;
    overlayRef.dispose();
    afterClosed.next({
        closeEventKind,
        data,
    });
    afterClosed.complete();
    return use as UsePopover;
};

export const closePopover: ClosePopover = function <T>(
    this: CloseContentUsePopover<T>,
    use?: CloseContentUsePopover<T>
): UsePopover {
    return use ? processClose(use) : processClose(this);
};
