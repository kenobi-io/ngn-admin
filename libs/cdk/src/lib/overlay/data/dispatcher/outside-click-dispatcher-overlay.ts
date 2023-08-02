import { Platform } from '@angular/cdk/platform';

import { Zonality } from '../../../directive';
import { DispatcherOverlay } from './dispatcher-overlay';

type PointerDownListener = {
    (event: PointerEvent): void;
    // eslint-disable-next-line no-use-before-define
    (this: OutsideClickDispatcherOverlay, event: PointerEvent): void;
};

type ClickListener = {
    (event: Event): void;
    // eslint-disable-next-line no-use-before-define
    (this: OutsideClickDispatcherOverlay, event: MouseEvent): void;
};

type ChangesOutsideClickDispatcherOverlay = {
    pointerDownEventTarget: EventTarget;
};

export type OutsideClickDispatcherOverlay = Zonality &
    DispatcherOverlay &
    Partial<ChangesOutsideClickDispatcherOverlay> & {
        // kindof: 'OutsideClickDispatcherOverlay';
        cursorOriginalValue: string;
        cursorStyleIsSet: boolean;
        platform: Platform;
        /** @breaking-change 14.0.0 _ngZone will be required. */
        pointerDownListener: PointerDownListener;
        listener: ClickListener;
    };

export type OutsideClickDispatcherOverlayCapability = {
    dispatcher: OutsideClickDispatcherOverlay;
};
