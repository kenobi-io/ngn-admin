import {
    ElementRef,
    EmbeddedViewRef,
    TemplateRef,
    Type,
    ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Context } from './context-template';
import { OptionsEmbeddedViewRef } from './options-embedded-view';

/**
 * Description structure data by interaction with directive - \
 * the facade of the directive.
 */
export interface Use<T, K = HTMLElement | Type<T>> {
    context: Context<T>;
    elementRef: ElementRef<K>;
    optionsEmbeddedViewRef: OptionsEmbeddedViewRef;
    subscriptions: Subscription[] | null;
    templateRef: TemplateRef<Context<T>>;
    viewContainerRef: ViewContainerRef;
    viewRef: EmbeddedViewRef<Context<T>> | null;
}
