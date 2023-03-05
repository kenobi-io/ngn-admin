import { ComponentType } from '@angular/cdk/portal';
import {
    ComponentFactoryResolver,
    Injector,
    ViewContainerRef,
} from '@angular/core';

import { Portal } from './portal';

/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */

export interface ComponentPortal<T> extends Portal {
    /** The type of the component that will be instantiated for attachment. */
    component: ComponentType<T>;
    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This is different from where the component *renders*, which is determined by the PortalOutlet.
     * The origin is necessary when the host is outside of the Angular application context.
     */
    viewContainerRef?: ViewContainerRef | null;

    /** Injector used for the instantiation of the component. */
    injector?: Injector | null;

    /**
     * Alternate `ComponentFactoryResolver` to use when resolving the associated component.
     * Defaults to using the resolver from the outlet that the portal is attached to.
     */
    componentFactoryResolver?: ComponentFactoryResolver | null;

    /**
     * List of DOM nodes that should be projected through `<ng-content>` of the attached component.
     */
    projectableNodes?: Node[][] | null;
}
