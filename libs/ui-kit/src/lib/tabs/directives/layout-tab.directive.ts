import {
    AfterContentInit,
    Directive,
    EmbeddedViewRef,
    Input,
    OnChanges,
    OnDestroy,
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

import { /* TabComponent,  TAB_TOKEN,*/ UseLayoutTab } from '../data';
// import { IconTabComponent } from '../icon-tab/icon-tab.component';
import { createContextLayoutTab } from '../interactions';

@Directive({
    // providers: [{ provide: TAB_TOKEN, useValue: IconTabComponent }],
    selector: '[layoutTab]',
    standalone: true,
})
export class LayoutTabDirective
    implements AfterContentInit, OnChanges, OnDestroy
{
    @Input() layoutTabMenuStyle!: string;
    @Input() layoutTabContainerStyle!: string;

    private useLayoutTab: UseLayoutTab;

    constructor(
        private readonly templateRef: TemplateRef<ContextUse>,
        private readonly viewContainerRef: ViewContainerRef // @Inject(TAB_TOKEN) private readonly tabComponent: TabComponent
    ) {
        lapi(createViewRef)(
            (this.useLayoutTab = {
                context: null,
                input: this,
                // tabComponent,
                templateRef,
                viewContainerRef,
                viewRef: {} as EmbeddedViewRef<ContextUse> | null,
            })
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.useLayoutTab.changes = changes;
    }

    ngAfterContentInit(): void {
        createContextLayoutTab(this.useLayoutTab);
    }

    ngOnDestroy() {
        lapi(
            unsubscribeFromAll,
            clearViewContainerRef,
            destroyViewRef
        )(this.useLayoutTab);
    }
}
