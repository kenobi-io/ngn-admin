import { ComponentRef, EmbeddedViewRef } from '@angular/core';

import { Zonality } from '../../directive';
import { Portal } from './portal';

export type PortalOutlet<T> = Zonality & {
    /** Whether this host has already been permanently disposed. */
    isDisposed: boolean;
    // mapStrategyFnsAttach: MapStrategyAttach;
    // strategyAttachKind: KindStrategyAttach;
} & Partial<{
        // TODO: polymorph
        /** A function that will permanently dispose this host. */
        disposeFn: () => void;
        attachedPortal: Portal;
        appendedPortal: ComponentRef<T> | EmbeddedViewRef<T> | HTMLElement;
        portal: Portal;
        detachmentResult: unknown;
    }>;
