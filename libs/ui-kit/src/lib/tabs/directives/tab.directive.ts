/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
    Directive,
    EmbeddedViewRef,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {
    clearViewContainerRef,
    ContextUse,
    createViewRef,
    destroyViewRef,
    unsubscribeFromAll,
} from '@ngn-template/access';
import { lapi } from '@relax';

import { UseTab } from '../data';
import { createContextTab, toggleTab } from '../interactions';

@Directive({
    selector: '[tab]',
    standalone: true,
})
export class TabDirective implements OnChanges, OnDestroy {
    @Input() tabActiveStyle!: string;
    @Input() tabInactiveStyle!: string;
    @Input() tabOrderId!: string;
    @Input() tabCurrent!: string;
    @Output() tabShow!: () => unknown | void;

    private useTab: UseTab;

    constructor(
        private readonly templateRef: TemplateRef<ContextUse>,
        private readonly viewContainerRef: ViewContainerRef
    ) {
        lapi(
            createContextTab,
            createViewRef
        )(
            (this.useTab = {
                context: null,
                input: this,
                templateRef,
                viewContainerRef,
                viewRef: {} as EmbeddedViewRef<ContextUse> | null,
            })
        );
    }
    ngOnChanges(changes: SimpleChanges): void {
        lapi((useTab: UseTab) =>
            toggleTab(useTab, changes['tabOrderId'] as unknown as string)
        )(this.useTab);
    }

    ngOnDestroy() {
        lapi(
            unsubscribeFromAll,
            clearViewContainerRef,
            destroyViewRef
        )(this.useTab);
    }
}
