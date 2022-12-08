import { OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import { Context } from '@ngn-template/cdk';

import { ContextPopover } from '../../data';

export const templateAttach = <T>(
    context: ContextPopover<T> | undefined | null,
    injectorRef: Injector,
    overlayRef: OverlayRef,
    template: TemplateRef<Context<T>>,
    viewContainerRef: ViewContainerRef
): void => {
    overlayRef.attach(
        new TemplatePortal(template, viewContainerRef, context, injectorRef)
    );
};
