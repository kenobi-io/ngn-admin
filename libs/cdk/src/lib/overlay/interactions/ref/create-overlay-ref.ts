import { DOCUMENT, Location } from '@angular/common';
import { ANIMATION_MODULE_TYPE, inject, InjectionToken } from '@angular/core';
import { Model } from '@core-template';
import { Subject, Subscription } from 'rxjs';

import { changes, ZONE_TOKEN } from '../../../platform';
import { OverlayRef } from '../../data';
import {
    KEYBOARD_DISPATCHER_OVERLAY,
    OUTSIDE_CLICK_DISPATCHER_OVERLAY,
} from '../dispatcher';
import {
    backdropClickHandlerOverlayRef,
    backdropTransitionendHandlerOverlayRef,
} from './attach/backdrop-handler-overlay-ref';

export const CHANGE_OVERLAY_REF = new InjectionToken<OverlayRef<Model>>(
    '[CHANGE_OVERLAY_REF]'
);

export const createOverlayRef = <T>(
    change?: Partial<OverlayRef<T>>
): OverlayRef<T> => {
    const overlayRef: OverlayRef<T> = {
        animationsDisabled: inject(ANIMATION_MODULE_TYPE) === 'NoopAnimations',
        attachments: new Subject<void>(),
        backdropClick: new Subject<MouseEvent>(),
        backdropClickHandler: (event: MouseEvent): void => {
            backdropClickHandlerOverlayRef.call(overlayRef, event);
        },
        backdropElement: null,
        backdropTransitionendHandler: (event: TransitionEvent): void => {
            backdropTransitionendHandlerOverlayRef.call(overlayRef, event);
        },
        detachments: new Subject<void>(),
        document: inject(DOCUMENT),
        keyboardDispatcher: inject(KEYBOARD_DISPATCHER_OVERLAY),
        keydownEvents: new Subject<KeyboardEvent>(),
        location: inject(Location),
        locationChanges: Subscription.EMPTY,
        ngZone: inject(ZONE_TOKEN),
        outsideClickDispatcher: inject(OUTSIDE_CLICK_DISPATCHER_OVERLAY),
        outsidePointerEvents: new Subject<MouseEvent>(),
    };
    changes(overlayRef, change, CHANGE_OVERLAY_REF);

    return overlayRef;
};

export const OVERLAY_REF = new InjectionToken<OverlayRef<Model>>(
    '[OVERLAY_REF]',
    {
        factory: () => createOverlayRef(),
    }
);
