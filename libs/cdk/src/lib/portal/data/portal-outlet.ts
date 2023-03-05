import { ComponentRef, EmbeddedViewRef } from '@angular/core';

import { Portal } from './portal';

type KindStrategyAttach = 'ComponentPortal' | 'TemplatePortal' | 'DomPortal';

type FnStrategyAttach = <K>(outlet: K) => K;

export type MapStrategyAttach = Map<KindStrategyAttach, FnStrategyAttach>;

type ChangePortalOutlet<T> = {
    // TODO: polymorph
    /** A function that will permanently dispose this host. */
    disposeFn: () => void;
    attachedPortal: Portal;
    appendedPortal: ComponentRef<T> | EmbeddedViewRef<T> | HTMLElement;
    portal: Portal;
    detachmentResult: unknown;
};

type CreatePortalOutlet = {
    /** Whether this host has already been permanently disposed. */
    isDisposed: boolean;
    mapStrategyFnsAttach: MapStrategyAttach;
    strategyAttachKind: KindStrategyAttach;
};

export type PortalOutlet<T> = CreatePortalOutlet &
    Partial<ChangePortalOutlet<T>>;
