import { EmbeddedViewRef } from '@angular/core';

import { DomPortalOutlet, TemplatePortal } from '../data';

export type AttachTemplatePortalOutlet<T> = DomPortalOutlet<T> & {
    viewRef: EmbeddedViewRef<T>;
};
/**
 * Attaches a template portal to the DOM as an embedded view.
 * @param use Portal to be attached.
 * @returns Reference to the created embedded view.
 */

export const attachTemplatePortalOutlet = <T>(
    use: DomPortalOutlet<T>
): AttachTemplatePortalOutlet<T> => {
    const { portal } = use;
    const { context, injector, templateRef, viewContainerRef } =
        portal as TemplatePortal<T>;
    const viewContainer = viewContainerRef;
    const viewRef = viewContainer.createEmbeddedView(templateRef, context, {
        injector: injector,
    });
    // The method `createEmbeddedView` will add the view as a child of the viewContainer.
    // But for the DomPortalOutlet the view can be added everywhere in the DOM
    // (e.g Overlay Container) To move the view to the specified host element. We just
    // re-append the existing root nodes.
    viewRef.rootNodes.forEach((rootNode) =>
        use.outletElement?.appendChild(rootNode)
    );
    // Note that we want to detect changes after the nodes have been moved so that
    // any directives inside the portal that are looking at the DOM inside a lifecycle
    // hook won't be invoked too early.
    viewRef.detectChanges();
    use.disposeFn = () => {
        const index = viewContainer.indexOf(viewRef);
        if (index !== -1) {
            viewContainer.remove(index);
        }
    };
    use.attachedPortal = portal;
    use.appendedPortal = viewRef;
    // TODO(jelbourn): Return locals from view.
    return { ...use, viewRef };
};
