import { ComponentRef, EmbeddedViewRef, Injector } from '@angular/core';

import { ComponentPortal, DomPortalOutlet } from '../data';

export type AttachComponentPortal<T> = DomPortalOutlet<T> & {
    componentRef?: ComponentRef<T>;
};
/**
 * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
 * @param use Portal to be attached
 * @returns Reference to the created component.
 */

export const attachComponentPortalOutlet = <T>(
    use: DomPortalOutlet<T>
): AttachComponentPortal<T> => {
    const { appRef, componentFactoryResolver, outletElement, portal } = use;
    const { component, injector, projectableNodes, viewContainerRef } =
        portal as ComponentPortal<T>;
    const componentFactory =
        componentFactoryResolver?.resolveComponentFactory(component);
    let componentRef: ComponentRef<T> | undefined = undefined;
    // If the portal specifies a ViewContainerRef, we will use that as the attachment point
    // for the component (in terms of Angular's component tree, not rendering).
    // When the ViewContainerRef is missing, we use the factory to create the component directly
    // and then manually attach the view to the application.
    if (componentFactory) {
        if (viewContainerRef) {
            componentRef = viewContainerRef.createComponent(
                componentFactory,
                viewContainerRef.length,
                injector || viewContainerRef.injector,
                projectableNodes || undefined
            );

            use.disposeFn = () => componentRef?.destroy();
        } else {
            componentRef = componentFactory.create(
                injector || use.injector || Injector.NULL
            );
            appRef?.attachView(componentRef.hostView);
            use.disposeFn = () => {
                // Verify that the ApplicationRef has registered views before trying to detach a host view.
                // This check also protects the `detachView` from being called on a destroyed ApplicationRef.
                if (appRef?.viewCount && appRef.viewCount > 0 && componentRef) {
                    appRef.detachView(componentRef.hostView);
                }
                componentRef?.destroy();
            };
        }
    }
    // At this point the component has been instantiated, so we move it to the location in the DOM
    // where we want it to be rendered.
    if (componentRef) {
        const rootNode = (componentRef.hostView as EmbeddedViewRef<T>)
            .rootNodes[0] as HTMLElement;
        outletElement?.appendChild(rootNode);
    }
    use.attachedPortal = portal;
    use.appendedPortal = componentRef;
    return { ...use, componentRef };
};
