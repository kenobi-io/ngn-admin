import { Bounden } from '@core-template';
import { Subject, Subscription } from 'rxjs';

import {
    backdropClickHandler,
    backdropTransitionendHandler,
} from './attach/backdrop-handler-attach';
import { OverlayRef } from './overlay-ref';

export type CreateOverlayRef = Bounden<
    OverlayRef,
    | 'animationsDisabled'
    | 'config'
    | 'document'
    | 'host'
    | 'keyboardDispatcher'
    | 'location'
    | 'outsideClickDispatcher'
    | 'ngZone'
    | 'pane'
    | 'portalOutlet'
>;

export const createOverlayRef = (ref: CreateOverlayRef): OverlayRef => {
    const overlayRef: OverlayRef = {
        _keydownEvents: new Subject<KeyboardEvent>(),
        _outsidePointerEvents: new Subject<MouseEvent>(),
        animationsDisabled: ref.animationsDisabled || false,
        attachments: new Subject<void>(),
        backdropClick: new Subject<MouseEvent>(),
        backdropClickHandler: backdropClickHandler.bind(this),
        backdropElement: null,
        backdropTransitionendHandler: backdropTransitionendHandler.bind(this),
        config: ref.config,
        detachments: new Subject<void>(),
        document: ref.document,
        host: ref.host,
        keyboardDispatcher: ref.keyboardDispatcher,
        location: ref.location,
        locationChanges: Subscription.EMPTY,
        ngZone: ref.ngZone,
        outsideClickDispatcher: ref.outsideClickDispatcher,
        pane: ref.pane,
        portalOutlet: ref.portalOutlet,
    } as unknown as OverlayRef;
    if (ref.config.scrollStrategy) {
        overlayRef.scrollStrategy = ref.config.scrollStrategy;
        overlayRef.scrollStrategy.attach(overlayRef);
    }
    if (ref.config.positionStrategy) {
        overlayRef.positionStrategy = ref.config.positionStrategy;
    }
    return overlayRef;
};
