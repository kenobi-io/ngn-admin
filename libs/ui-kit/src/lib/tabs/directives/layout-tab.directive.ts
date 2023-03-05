// import {
//    Directive,
//    EmbeddedViewRef,
//    Input,
//    OnChanges,
//    OnDestroy,
//    SimpleChanges,
//    TemplateRef,
//    ViewContainerRef,
// } from '@angular/core';
// import {
//    clearViewContainerRef,
//    createViewRef,
//    destroyViewRef,
//    unsubscribesFinal,
// } from '@ngn-template/cdk';
// import { pipe } from 'rxjs';
//
// import {
//    /* TabComponent,  TAB_TOKEN,*/ ContextTab,
//    UseLayoutTab,
// } from '../data';
/// / import { IconTabComponent } from '../icon-tab/icon-tab.component';
// import { createContextLayoutTab } from '../interactions';
//
// @Directive({
//    // providers: [{ provide: TAB_TOKEN, useValue: IconTabComponent }],
//    selector: '[layoutTab]',
//    standalone: true,
// })
// export class LayoutTabDirective
//    implements /* AfterContentInit, */ OnChanges, OnDestroy
// {
//    @Input() layoutTabMenu!: string;
//    @Input() layoutTabContainer!: string;
//    @Input() layoutTabList!: [];
//
//    private useLayoutTab: UseLayoutTab;
//
//    constructor(
//        private readonly templateRef: TemplateRef<ContextTab>,
//        private readonly viewContainerRef: ViewContainerRef // @Inject(TAB_TOKEN) private readonly tabComponent: TabComponent
//    ) {
//        pipe(
//            createContextLayoutTab,
//            createViewRef
//        )(
//            (this.useLayoutTab = {
//                context: {} as ContextTab,
//                input: this,
//                templateRef,
//                viewContainerRef,
//                viewRef: {} as EmbeddedViewRef<ContextTab>,
//            })
//        );
//    }
//
//    ngOnChanges(changes: SimpleChanges): void {
//        this.useLayoutTab.changes = changes;
//    }
//
//    // ngAfterContentInit(): void {
//    //     createContextLayoutTab(this.useLayoutTab);
//    // }
//
//    ngOnDestroy() {
//        pipe(
//            unsubscribesFinal,
//            clearViewContainerRef,
//            destroyViewRef
//        )(this.useLayoutTab);
//    }
// }
