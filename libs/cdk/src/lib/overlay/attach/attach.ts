import { Direction, Directionality } from '@angular/cdk/bidi';
import {
    OverlaySizeConfig,
    PositionStrategy,
    ScrollStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ComponentRef, EmbeddedViewRef } from '@angular/core';
import { SubscriptionLike } from 'rxjs';

import { OverlayRef } from '../overlay-ref';

export type Attach<T> = OverlayRef & {
    attachResult: ComponentRef<T> | EmbeddedViewRef<T>;
    backdrop: HTMLElement;
    detachmentResult: ComponentRef<T> | EmbeddedViewRef<T> | unknown;
    direction: Direction | Directionality;
    locationChanges: SubscriptionLike;
    panelClass: string | string[];
    portal: ComponentPortal<T> | TemplatePortal<T> | Portal<T>;
    sizeConfig: OverlaySizeConfig;
    strategy: ScrollStrategy;
    toggleClasses?: string | string[];
    toggleDirection: Direction | Directionality;
    togglePositionStrategy: PositionStrategy;
};
