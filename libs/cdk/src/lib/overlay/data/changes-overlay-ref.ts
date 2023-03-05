import { Direction, Directionality } from '@angular/cdk/bidi';
import { OverlaySizeConfig, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentRef, EmbeddedViewRef } from '@angular/core';
import { Subject } from 'rxjs';

import {
    ComponentPortal,
    Portal,
    PortalOutlet,
    TemplatePortal,
} from '../../portal';
import { ConfigOverlay } from './config-overlay';

type AttachChangesOverlayRef<T> = {
    animationsDisabled: boolean;
    componentEmbeddedRef: ComponentRef<T> | EmbeddedViewRef<T> | HTMLElement;
    backdrop: HTMLElement;
    detachmentResult: ComponentRef<T> | EmbeddedViewRef<T> | unknown;
    direction: Direction | Directionality;
    panelClass: string | string[];
    portal: ComponentPortal<T> | TemplatePortal<T> | Portal;
    sizeConfig: OverlaySizeConfig;
    toggleClasses?: string | string[];
    togglePositionStrategy: PositionStrategy;
};

type StrategiesChangesOverlayRef = {
    backdropTimeout: number;
    positionStrategy: PositionStrategy;
    /* strategiesScroll: StrategiesScrollOverlay;
    kindStrategiesScroll: KindStrategiesScroll;*/
    /**
     * Reference to the parent of the `_host` at the time it was detached. Used to restore
     * the `_host` to its original position in the DOM when it gets re-attached.
     */
    previousHostParent: HTMLElement;
    directionality: Directionality;
};

type SizeOverlayRef = {
    overlayElement: HTMLElement;
    /** Size properties for an overlay. */
    hostElement: HTMLElement;
    backdropElement: HTMLElement | null;
    outsidePointerEvents: Subject<MouseEvent>;
    keydownEvents: Subject<KeyboardEvent>;
};

export type ChangesOverlayRef<T> =
    /* PortalOutlet &*/
    Partial<AttachChangesOverlayRef<T>> &
        Partial<StrategiesChangesOverlayRef> &
        Partial<SizeOverlayRef> & {
            host: HTMLElement;
            pane: HTMLElement;
            portalOutlet: PortalOutlet<T>;
            config: ConfigOverlay;
        };
