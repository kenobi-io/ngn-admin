import { OverlayPositionBuilder } from '@angular/cdk/overlay';
import {
    ApplicationRef,
    inject,
    InjectionToken,
    INJECTOR,
} from '@angular/core';
import { Model } from '@core-template';
import { pipe } from 'rxjs';

import {
    changes,
    COMPONENT_FACTORY_RESOLVER_TOKEN,
    ZONE_TOKEN,
} from '../../platform';
import { domPortalOutlet } from '../../portal';
import { Overlay } from '../data';
import { configOverlay } from './config-overlay';
import { CONTAINER_OVERLAY } from './container';
import { OVERLAY_REF } from './ref';
import { OPTIONS_STRATEGY_SCROLL_OVERLAY } from './scroll';
import { setContainerBodyOverlay } from './set-container-body-overlay';

/** Next overlay unique ID. */
let nextUniqueId = 0; // TODO: legacy approach fix it

const paneOverlayRef = <T>(overlay: Overlay<T>): Overlay<T> => {
    const { ref } = overlay;
    ref.pane = ref.document.createElement('div');
    ref.pane.id = `cdk-overlay-${nextUniqueId++}`;
    ref.pane.classList.add('cdk-overlay-pane');
    ref.host?.appendChild(ref.pane);

    return overlay;
};

const hostOverlayRef = <T>(overlay: Overlay<T>): Overlay<T> => {
    const { container, ref } = overlay;
    ref.host = document.createElement('div');

    if (container) {
        setContainerBodyOverlay(container);
        container.body?.appendChild(ref.host);
    }

    return overlay;
};

const portalOutletOverlayRef = <T>(overlay: Overlay<T>): Overlay<T> => {
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

    return overlay;
};

const directionConfigOverlayRef = <T>(overlay: Overlay<T>): Overlay<T> => {
    const { config, directionality, ref } = overlay;

    if (config && directionality) {
        ref.config = config;
        ref.config.direction = config.direction || directionality.value;
    }

    return overlay;
};

const configOverlayRef = <T>(overlay: Overlay<T>): Overlay<T> => {
    const { ref } = overlay;
    ref.config = configOverlay(overlay.config);
    const { config } = overlay.ref;
    const {
        kindStrategiesScroll,
        positionStrategy,
        strategiesScroll: scrollStrategy,
    } = {
        ...config,
    };

    if (kindStrategiesScroll && scrollStrategy) {
        ref.strategiesScroll = scrollStrategy;
        ref.kindStrategiesScroll = kindStrategiesScroll;
        const { attachStrategiesScroll } = scrollStrategy;
        const attach = attachStrategiesScroll.get(kindStrategiesScroll);
        attach?.(ref);
    }

    if (positionStrategy) {
        ref.positionStrategy = positionStrategy;
    }

    return overlay;
};

export const CHANGE_OVERLAY = new InjectionToken<Overlay<Model>>(
    '[CHANGE_OVERLAY]'
);

/**
 * Creates an overlay.
 * @param change Configuration applied to the overlay.
 * @returns Reference to the created overlay.
 */
export const createOverlay = <T>(change?: Partial<Overlay<T>>): Overlay<T> => {
    const injector = inject(INJECTOR);
    const overlay: Overlay<T> = pipe(
        hostOverlayRef,
        paneOverlayRef,
        directionConfigOverlayRef,
        portalOutletOverlayRef,
        configOverlayRef
    )({
        // We have to resolve the ApplicationRef later in order to allow people
        // to use overlay-based providers during app initialization.
        appRef: injector.get<ApplicationRef>(ApplicationRef),
        componentFactoryResolver: inject(COMPONENT_FACTORY_RESOLVER_TOKEN),
        container: inject(CONTAINER_OVERLAY),
        injector,
        ngZone: inject(ZONE_TOKEN),
        optionsStrategyScroll: inject(OPTIONS_STRATEGY_SCROLL_OVERLAY),
        positionBuilder: inject(OverlayPositionBuilder),
        ref: inject(OVERLAY_REF),
    });
    changes(overlay, change, CHANGE_OVERLAY);

    return overlay;
};

export const OVERLAY = new InjectionToken<Overlay<Model>>('[OVERLAY]', {
    factory: () => createOverlay(),
});
