import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { ContextUse } from './context-use';
/**
 * Description structure data by interaction with directive.
 */
export interface Use {
    context: ContextUse | null;
    subscriptions: Subscription[] | null;
    templateRef: TemplateRef<ContextUse>;
    viewContainerRef: ViewContainerRef;
    viewRef: EmbeddedViewRef<ContextUse> | null;
}
