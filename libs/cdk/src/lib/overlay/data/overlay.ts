/* eslint-disable no-use-before-define */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OverlayPositionBuilder } from '@angular/cdk/overlay';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    Injector,
} from '@angular/core';

import { Zonality } from '../../directive';
import { ChangesOverlayRef } from './changes-overlay-ref';
import { ConfigOverlay } from './config-overlay';
import { ContainerOverlay } from './container-overlay';
import { OptionsStrategyScrollOverlay } from './options-strategy-scroll-overlay';
import { OverlayRef } from './overlay-ref';

type CreateOverlay<T> = Zonality & {
    appRef: ApplicationRef;
    componentFactoryResolver: ComponentFactoryResolver;
    injector: Injector;
    positionBuilder: OverlayPositionBuilder;
    ref: OverlayRef<T>;
    optionsStrategyScroll: OptionsStrategyScrollOverlay<T>;
};

type ChangesOverlay<T> = ChangesOverlayRef<T> & {
    config: ConfigOverlay;
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
export type Overlay<T> = CreateOverlay<T> & Partial<ChangesOverlay<T>>;
