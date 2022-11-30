import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
import { Use } from '@ngn-template/access';

import { ContextPopover } from './context-popover';
import { Popover } from './popover';

export interface UsePopover<T = Popover> extends Use<T> {
    context: ContextPopover<T>;
    data: T;
    injector: Injector;
    overlay: Overlay;
    overlayRef: OverlayRef;
}
