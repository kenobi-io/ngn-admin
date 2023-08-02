import { OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ApplicationRef, inject, INJECTOR } from '@angular/core';
import { Mono, mono } from '@core-template';
import { pipe } from 'rxjs';

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
import { OVERLAY_REF } from './ref';
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
        // We have to resolve the ApplicationRef later in order to allow people
        // to use overlay-based providers during app initialization.
        appRef: injector.get<ApplicationRef>(ApplicationRef),
        componentFactoryResolver: inject(COMPONENT_FACTORY_RESOLVER_TOKEN),
        container: inject(CONTAINER_OVERLAY),
        injector,
        ngZone: inject(ZONE_TOKEN),
        optionsStrategyScroll: inject(OPTIONS_STRATEGY_SCROLL_OVERLAY),
        positionBuilder: inject(OverlayPositionBuilder), // TODO: dcing OverlayPositionBuilder
        ref: inject(OVERLAY_REF),
    });
    changes(overlay, change, CHANGE_OVERLAY);

    return overlay;
};

/** Next overlay unique ID. */
let nextUniqueId = 0; // TODO: legacy approach fix it

const paneOverlayRef = <T>(): Mono<Overlay<T>> =>
    mono((overlay) => {
        const { ref } = overlay;
        ref.pane = ref.document.createElement('div');
        ref.pane.id = `cdk-overlay-${nextUniqueId++}`;
        ref.pane.classList.add('cdk-overlay-pane');
        ref.host?.appendChild(ref.pane);
    });

const hostOverlayRef = <T>(): Mono<Overlay<T>> =>
    mono((overlay) => {
        const { container, ref } = overlay;
        ref.host = document.createElement('div');

        if (container) {
            setContainerBodyOverlay(container);
            container.body?.appendChild(ref.host);
        }
    });

const portalOutletOverlayRef = <T>(): Mono<Overlay<T>> =>
    mono((overlay) => {
        const { appRef, componentFactoryResolver, injector, ref } = overlay;

        if (ref.pane) {
            ref.portalOutlet = domPortalOutlet({
                appRef,
                componentFactoryResolver,
                document: ref.document,
                injector,
                outletElement: ref.pane,
            });
        }
    });

const directionConfigOverlayRef = <T>(): Mono<Overlay<T>> =>
    mono((overlay) => {
        const { config, directionality, ref } = overlay;

        if (config && directionality) {
            ref.config = config;
            ref.config.direction = config.direction || directionality.value;
        }

        return overlay;
    });

const configOverlayRefAndAttach = <T>(
    attachStrategiesScroll: Mono<StrategyScroll<T>>
): Mono<Overlay<T>> =>
    mono((overlay) => {
        const { ref } = overlay;
        ref.config = configOverlay<T>(overlay.config);
        const { config } = overlay.ref;
        const {
            // kindStrategiesScroll,
            // positionStrategy,
            strategyScroll,
        } = {
            ...config,
        };

        if (strategyScroll) {
            // ref.strategiesScroll = scrollStrategy;
            // ref.kindStrategiesScroll = kindStrategiesScroll;
            // const { attachStrategiesScroll } = strategiesScroll;
            // const attach = attachStrategiesScroll.get(kindStrategiesScroll);
            // attachStrategiesScroll(ref); // stage 1
            attachStrategiesScroll(strategyScroll); // stage 2
        }

        // if (positionStrategy) {
        //     ref.positionStrategy = positionStrategy;
        // }
    });
