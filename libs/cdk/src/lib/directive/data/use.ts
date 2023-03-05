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

export type Zonality = {
    ngZone: NgZone;
};

interface CreateUse<K> extends Zonality {
    elementRef: ElementRef<K>;
    viewContainerRef: ViewContainerRef;
}

interface ChangesUse<T> extends Zonality {
    context: Context<T>;
    optionsEmbeddedViewRef: OptionsEmbeddedViewRef;
    templateRef: TemplateRef<Context<T>>;
    viewRef: EmbeddedViewRef<Context<T>>;
}

/**
 * Description structure data by interaction with directive - \
 * the facade of the directive.
 */
export type Use<T, K = HTMLElement | ComponentRef<T>> = CreateUse<K> &
    Partial<ChangesUse<T>>;
