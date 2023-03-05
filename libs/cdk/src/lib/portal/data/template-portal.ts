import {
    ElementRef,
    Injector,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

import { Portal } from './portal';

/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */

export interface TemplatePortal<T> extends Portal {
    /** The embedded template that will be used to instantiate an embedded View in the host. */
    templateRef: TemplateRef<T>;
    /** Reference to the ViewContainer into which the template will be stamped out. */
    viewContainerRef: ViewContainerRef;
    /** Contextual data to be passed in to the embedded view. */
    context: T;
    /** The injector to use for the embedded view. */
    injector: Injector;
    origin: ElementRef<T>; // templateRef.elementRef
}
