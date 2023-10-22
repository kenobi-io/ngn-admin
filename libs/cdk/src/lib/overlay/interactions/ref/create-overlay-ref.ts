// import { DOCUMENT, Location } from '@angular/common';
// import { ANIMATION_MODULE_TYPE, inject, InjectionToken } from '@angular/core';
// import { Model } from '@core-template';
// import { Subject, Subscription } from 'rxjs';

// import { changes, ZONE_TOKEN } from '../../../platform';
// import { Overlay } from '../../data';
// import {
//     KEYBOARD_DISPATCHER_OVERLAY,
//     OUTSIDE_CLICK_DISPATCHER_OVERLAY,
// } from '../dispatcher';
// import {
//     backdropClickHandlerOverlayRef,
//     backdropTransitionendHandlerOverlayRef,
// } from './attach/backdrop-handler-overlay';

// export const CHANGE_OVERLAY_REF = new InjectionToken<Overlay<Model>>(
//     '[CHANGE_OVERLAY_REF]'
// );

// export const createOverlayRef = <T>(
//     change?: Partial<Overlay<T>>
// ): Overlay<T> => {
//     const overlay: Overlay<T> = {
//         animationsDisabled: inject(ANIMATION_MODULE_TYPE) === 'NoopAnimations',
//         attachments: new Subject<void>(),
//         backdropClick: new Subject<MouseEvent>(),
//         backdropClickHandler: (event: MouseEvent): void => {
//             backdropClickHandlerOverlayRef.call(overlay, event);
//         },
//         backdropElement: null,
//         backdropTransitionendHandler: (event: TransitionEvent): void => {
//             backdropTransitionendHandlerOverlayRef.call(overlay, event);
//         },
//         detachments: new Subject<void>(),
//         dispatcherOverlay: inject(KEYBOARD_DISPATCHER_OVERLAY),
//         document: inject(DOCUMENT),
//         keydownEvents: new Subject<KeyboardEvent>(),
//         location: inject(Location),
//         locationChanges: Subscription.EMPTY,
//         ngZone: inject(ZONE_TOKEN),
//         outsideClickDispatcher: inject(OUTSIDE_CLICK_DISPATCHER_OVERLAY),
//         outsidePointerEvents: new Subject<MouseEvent>(),
//     };
//     changes(overlay, change, CHANGE_OVERLAY_REF);

//     return overlay;
// };

// export const OVERLAY_REF = new InjectionToken<Overlay<Model>>('[OVERLAY_REF]', {
//     factory: () => createOverlayRef(),
// });
