/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
    ApplicationRef,
    ComponentFactoryResolver,
    Injector,
} from '@angular/core';

import { ComponentPortal } from './component-portal';
import { DomPortal } from './dom-portal';
import { PortalOutlet } from './portal-outlet';
import { TemplatePortal } from './template-portal';

type ChangesDomPortalOutlet<T> = {
    /** Reference to the document. Used when attaching a DOM portal. Will eventually
     * become a required parameter. */
    document: Document;
    /** Element into which the content is projected. */
    outletElement: Element;
    /** Used to resolve the component factory. */
    componentFactoryResolver: ComponentFactoryResolver;
    /** Injector to use as a fallback when the portal being attached doesn't
     * have one. Only used for component portals. */
    appRef: ApplicationRef;
    injector: Injector;
    portal: DomPortal | ComponentPortal<T> | TemplatePortal<T>;
};

/**
 * A PortalOutlet for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 */
export type DomPortalOutlet<T> = PortalOutlet<T> &
    Partial<ChangesDomPortalOutlet<T>>;
