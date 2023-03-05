import { Platform } from '@angular/cdk/platform';

import { Zonality } from '../../../directive';
import { DispatcherOverlay } from './dispatcher-overlay';

type PointerDownListener = {
    (event: PointerEvent): void;
    // eslint-disable-next-line no-use-before-define
    <T>(this: OutsideClickDispatcherOverlay<T>, event: PointerEvent): void;
};

type ClickListener = {
    (event: MouseEvent): void;
    // eslint-disable-next-line no-use-before-define
    <T>(this: OutsideClickDispatcherOverlay<T>, event: MouseEvent): void;
};

type ChangesOutsideClickDispatcherOverlay = {
    pointerDownEventTarget: EventTarget;
};

export type OutsideClickDispatcherOverlay<T> = Zonality &
    DispatcherOverlay<T> &
    Partial<ChangesOutsideClickDispatcherOverlay> & {
        kindof: 'OutsideClickDispatcherOverlay';
        cursorOriginalValue: string;
        cursorStyleIsSet: boolean;
        platform: Platform;
        /** @breaking-change 14.0.0 _ngZone will be required. */
        pointerDownListener: PointerDownListener;
        clickListener: ClickListener;
    };
