import {
    ElementRef,
    EmbeddedViewRef,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ContextUse } from './context-use';

export type EmbedNull = EmbeddedViewRef<ContextUse> | null;

/**
 * Description structure data by interaction with directive.
 */
export interface Use {
    context: ContextUse | null;
    elRef?: ElementRef<HTMLElement>;
    subscriptions?: Subscription[] | null;
    templateRef?: TemplateRef<ContextUse>;
    viewContainerRef: ViewContainerRef;
    viewRef: EmbeddedViewRef<ContextUse> | null;
}
