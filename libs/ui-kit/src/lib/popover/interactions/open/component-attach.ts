import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injector, ViewContainerRef } from '@angular/core';

export const componentAttach = <T>(
    content: ComponentType<T>,
    injectorRef: Injector,
    overlayRef: OverlayRef,
    viewContainerRef: ViewContainerRef
): void => {
    overlayRef.attach(
        new ComponentPortal(content, viewContainerRef, injectorRef)
    );
};
