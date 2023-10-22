/* eslint-disable no-use-before-define */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
    OverlayPositionBuilder,
    OverlaySizeConfig,
} from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injector,
} from '@angular/core';
import { Mono } from '@core-template';
import { Subject, Subscription, SubscriptionLike } from 'rxjs';

import { Zonality } from '../../directive';
import { Portal, PortalOutlet } from '../../portal';
import { StrategyScroll } from '../../scroll';
import { ConfigOverlay } from './config-overlay';
import { ContainerOverlay } from './container-overlay';
import {
    KeyboardDispatcherOverlay,
    OutsideClickDispatcherOverlay,
} from './dispatcher';
import { OptionsStrategyScrollOverlay } from './options-strategy-scroll-overlay';

type ChangesOverlay<T> =
    /* PortalOutlet &*/
    {
        // attach
        animationsDisabled: boolean;
        attachResult: ComponentRef<T> | EmbeddedViewRef<T> | HTMLElement;
        backdrop: HTMLElement;
        detachmentResult: ComponentRef<T> | EmbeddedViewRef<T> | unknown;
        direction: Direction | Directionality;
        panelClass: string | string[];
        portal: /* ComponentPortal<T> | TemplatePortal<T> |  */ Portal;
        sizeConfig: OverlaySizeConfig;
        toggleClasses?: string | string[];

        host: HTMLElement;
        pane: HTMLElement;
        portalOutlet: PortalOutlet<T>;
        config: ConfigOverlay<T>;
        /** Stream of keydown events dispatched to this overlay. */
        /** Stream of mouse outside events dispatched to this overlay. */
        dispatcherOverlay:
            | KeyboardDispatcherOverlay
            | OutsideClickDispatcherOverlay;
        overlayElement: HTMLElement;
        // size
        /** Size properties for an overlay. */
        hostElement: HTMLElement;
        backdropElement: HTMLElement;
        outsidePointerEvents: Subject<MouseEvent | Event>;
        keydownEvents: Subject<KeyboardEvent | Event>;
        // strategies
        backdropTimeout: number;
        // positionStrategy: PositionStrategy;
        strategyScroll: StrategyScroll<T>;
        /**
         * Reference to the parent of the `_host` at the time it was detached. Used to restore
         * the `_host` to its original position in the DOM when it gets re-attached.
         */
        previousHostParent: HTMLElement;
        directionality: Directionality;
        container: ContainerOverlay;
    };

// Note that Overlay is *not* scoped to the app root because of the ComponentFactoryResolver
// which needs to be different depending on where OverlayModule is imported.
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalOutlet, so any kind of Portal can be loaded into one.
 */
export type Overlay<T = unknown> = Zonality &
    Partial<ChangesOverlay<T>> & {
        appRef: ApplicationRef;
        componentFactoryResolver: ComponentFactoryResolver;
        injector: Injector;
        positionBuilder: OverlayPositionBuilder;
        optionsStrategyScroll: OptionsStrategyScrollOverlay<T>;
        /**
         * Reference to an overlay that has been created with the Overlay service.
         * Used to manipulate or dispose of said overlay.
         */
        attachments: Subject<void>;
        backdropClick: Subject<Event>;
        backdropClickHandler: (event: Event) => void;
        backdropTransitionendHandler: (event: Event) => void;
        detachments: Subject<void>;
        document: Document;
        location: Location;
        locationChanges: SubscriptionLike | Subscription;
    };

export type ParamsMonoOverlay<
    Param = unknown,
    T = unknown,
    R extends Overlay<T> = Overlay<T>,
> = (param: Param) => Mono<R>;
