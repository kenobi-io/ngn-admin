import {
    ElementRef,
    EmbeddedViewRef,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ContextTemplate } from './context-template';

export type EmbedNull<T> = EmbeddedViewRef<ContextTemplate<T>> | null;

/**
 * Description structure data by interaction with directive - \
 * the facade of the directive.
 */
export interface Use<T> {
    context: ContextTemplate<T>;
    elementRef: ElementRef<ContextTemplate<T>>;
    subscriptions: Subscription[] | null;
    templateRef: TemplateRef<ContextTemplate<T>>;
    viewContainerRef: ViewContainerRef;
    viewRef: EmbeddedViewRef<ContextTemplate<T>> | null;
}
