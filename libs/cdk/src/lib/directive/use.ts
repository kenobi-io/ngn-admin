import {
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    NgZone,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

import { Context } from './context-template';
import { OptionsEmbeddedViewRef } from './options-embedded-view';

export interface Ref {
    ngZone: NgZone;
}

/**
 * Description structure data by interaction with directive - \
 * the facade of the directive.
 */
export interface Use<T, K = HTMLElement | ComponentRef<T>> extends Ref {
    context: Context<T>;
    elementRef: ElementRef<K>;
    optionsEmbeddedViewRef: OptionsEmbeddedViewRef;
    templateRef: TemplateRef<Context<T>>;
    viewContainerRef: ViewContainerRef;
    viewRef: EmbeddedViewRef<Context<T>> | null;
}
