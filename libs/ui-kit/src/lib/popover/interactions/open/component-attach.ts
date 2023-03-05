import { ComponentType } from '@angular/cdk/portal';
import { Injector, ViewContainerRef } from '@angular/core';
import { attachOverlayRef, Overlay } from '@ngn-template/cdk';

export const componentAttach = <T>(
    content: ComponentType<T>,
    injectorRef: Injector,
    overlay: Overlay<T>,
    viewContainerRef: ViewContainerRef
): void => {
    attachOverlayRef(
        overlay.ref
        // new ComponentPortal(content, viewContainerRef, injectorRef)
    );
};
