import { OverlayPositionBuilder } from '@angular/cdk/overlay';
import { DOCUMENT, Location } from '@angular/common';
import {
    ANIMATION_MODULE_TYPE,
    ApplicationRef,
    inject,
    INJECTOR,
} from '@angular/core';
import { Mono, mono } from '@core-template';
import { pipe, Subject, Subscription } from 'rxjs';

import {
    changes,
    COMPONENT_FACTORY_RESOLVER_TOKEN,
    ZONE_TOKEN,
} from '../../platform';
import { domPortalOutlet } from '../../portal';
import { StrategyScroll } from '../../scroll';
import {
    ATTACH_STRATEGY_SCROLL_OVERLAY,
    CHANGE_OVERLAY,
    Overlay,
} from '../data';
import { configOverlay } from './config-overlay';
import { CONTAINER_OVERLAY } from './container';
import {
    backdropClickHandlerOverlayRef,
    backdropTransitionendHandlerOverlayRef,
} from './ref/attach/backdrop-handler-overlay';
import { OPTIONS_STRATEGY_SCROLL_OVERLAY } from './scroll';
import { setContainerBodyOverlay } from './set-container-body-overlay';

/**
 * Creates an overlay.
 * @example
   ```js
   const SCROLL_STRATEGY_OVERLAY_PROVIDERS: Provider[] = [
       {
           provide: ATTACH_STRATEGY_SCROLL_OVERLAY,
           useValue: ATTACH_REPOSITION_STRATEGY_SCROLL
       },
   ];
   ```
 * @param change Configuration applied to the overlay.
 * @returns Reference to the created overlay.
 */
export const createOverlay = <T>(change?: Partial<Overlay<T>>): Overlay<T> => {
    const injector = inject(INJECTOR);
    const attachStrategiesScroll = inject<Mono<StrategyScroll<T>>>(
        ATTACH_STRATEGY_SCROLL_OVERLAY
    );
    const overlay: Overlay<T> = pipe(
        hostOverlayRef<T>(),
        paneOverlayRef<T>(),
        directionConfigOverlayRef<T>(),
        portalOutletOverlayRef<T>(),
        configOverlayRefAndAttach<T>(attachStrategiesScroll)
    )({
        // TODO: dcing OverlayPositionBuilder
        animationsDisabled: inject(ANIMATION_MODULE_TYPE) === 'NoopAnimations',
        // We have to resolve the ApplicationRef later in order to allow people
        // to use overlay-based providers during app initialization.
        appRef: injector.get<ApplicationRef>(ApplicationRef),
        attachments: new Subject<void>(),
        backdropClick: new Subject<MouseEvent | Event>(),
        backdropClickHandler: (event: MouseEvent | Event): void => {
            backdropClickHandlerOverlayRef.call(overlay, event);
        },
        backdropElement: null,
        backdropTransitionendHandler: (
            event: TransitionEvent | Event
        ): void => {
            backdropTransitionendHandlerOverlayRef.call(overlay, event);
        },
        componentFactoryResolver: inject(COMPONENT_FACTORY_RESOLVER_TOKEN),
        container: inject(CONTAINER_OVERLAY),
        detachments: new Subject<void>(),
        // dispatcherOverlay: inject(KEYBOARD_DISPATCHER_OVERLAY),
        document: inject(DOCUMENT),
        injector,
        keydownEvents: new Subject<KeyboardEvent | Event>(),
        location: inject(Location),
        locationChanges: Subscription.EMPTY,
        ngZone: inject(ZONE_TOKEN),
        optionsStrategyScroll: inject(OPTIONS_STRATEGY_SCROLL_OVERLAY),
        // outsideClickDispatcher: inject(OUTSIDE_CLICK_DISPATCHER_OVERLAY),
        outsidePointerEvents: new Subject<MouseEvent | Event>(),
        positionBuilder: inject(OverlayPositionBuilder),
    });
    changes(overlay, change, CHANGE_OVERLAY);

    return overlay;
};

/** Next overlay unique ID. */
let nextUniqueId = 0; // TODO: legacy approach fix it

const paneOverlayRef = <T>(): Mono<Overlay<T>> =>
    mono((overlay) => {
        overlay.pane = overlay.document.createElement('div');
        overlay.pane.id = `cdk-overlay-${nextUniqueId++}`;
        overlay.pane.classList.add('cdk-overlay-pane');
        overlay.host?.appendChild(overlay.pane);
    });

const hostOverlayRef = <T>(): Mono<Overlay<T>> =>
    mono((overlay) => {
        const { container } = overlay;
        overlay.host = document.createElement('div');

        if (container) {
            setContainerBodyOverlay(container);
            container.body?.appendChild(overlay.host);
        }
    });

const portalOutletOverlayRef = <T>(): Mono<Overlay<T>> =>
    mono((overlay) => {
        const { appRef, componentFactoryResolver, injector, ngZone } = overlay;

        if (overlay.pane) {
            overlay.portalOutlet = domPortalOutlet({
                appRef,
                componentFactoryResolver,
                document: overlay.document,
                injector,
                isDisposed: false,
                ngZone,
                outletElement: overlay.pane,
            });
        }
    });

const directionConfigOverlayRef = <T>(): Mono<Overlay<T>> =>
    mono((overlay) => {
        const { config, directionality } = overlay;

        if (config && directionality) {
            overlay.config = config;
            overlay.config.direction = config.direction || directionality.value;
        }

        return overlay;
    });

const configOverlayRefAndAttach = <T>(
    attachStrategiesScroll: Mono<StrategyScroll<T>>
): Mono<Overlay<T>> =>
    mono((overlay) => {
        overlay.config = configOverlay<T>(overlay.config);
        const { config } = overlay;
        const {
            // kindStrategiesScroll,
            // positionStrategy,
            strategyScroll,
        } = {
            ...config,
        };

        if (strategyScroll) {
            // overlay.strategiesScroll = scrollStrategy;
            // overlay.kindStrategiesScroll = kindStrategiesScroll;
            // const { attachStrategiesScroll } = strategiesScroll;
            // const attach = attachStrategiesScroll.get(kindStrategiesScroll);
            // attachStrategiesScroll(overlay); // stage 1
            attachStrategiesScroll(strategyScroll); // stage 2
        }

        // if (positionStrategy) {
        //     overlay.positionStrategy = positionStrategy;
        // }
    });
