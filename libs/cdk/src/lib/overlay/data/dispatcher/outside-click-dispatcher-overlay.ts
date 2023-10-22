import { Platform } from '@angular/cdk/platform';

import { Zonality } from '../../../directive';
import {
    DispatcherOverlay,
    DispatcherOverlayCapability,
} from './dispatcher-overlay';

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

export type OutsideClickDispatcherOverlay = DispatcherOverlay &
    Partial<
        Zonality & { pointerDownEventTarget: EventTarget } & {
            // kindof: 'OutsideClickDispatcherOverlay';
            cursorOriginalValue: string;
            cursorStyleIsSet: boolean;
            platform: Platform;
            /** @breaking-change 14.0.0 _ngZone will be required. */
            pointerDownListener: PointerDownListener;
            pointerDownEventTarget: EventTarget;

            listener: ClickListener;
        }
    >;

export type OutsideClickDispatcherOverlayCapability<T = unknown> =
    DispatcherOverlayCapability<T> & {
        dispatcherOverlay?: OutsideClickDispatcherOverlay;
    };
