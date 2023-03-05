/// * eslint-disable @nrwl/nx/enforce-module-boundaries */
// import {
//    AfterContentInit,
//    Directive,
//    ElementRef,
//    EmbeddedViewRef,
//    Inject,
//    Input,
//    OnChanges,
//    OnDestroy,
//    Output,
//    Renderer2,
//    SimpleChanges,
//    // TemplateRef,
//    ViewContainerRef,
// } from '@angular/core';
// import {
//    clearViewContainerRef,
//    ContextTemplate,
//    createViewRef,
//    destroyViewRef,
//    unsubscribesFinal,
// } from '@ngn-template/cdk';
//
// import { Tab, UseTab } from '../data';
// import { addTab, createContextUseTab, toggleTab } from '../interactions';
//
// @Directive({
//    exportAs: 'tabContent',
//    selector: '[tabContent], tab-content',
//    standalone: true,
// })
// export class ContentTabDirective
//    implements AfterContentInit, OnChanges, OnDestroy
// {
//    @Input() tabActiveStyle!: string;
//    @Input() tabInactiveStyle!: string;
//    @Input() tabOrderId!: string;
//    @Input() tabTabs!: Tab[];
//    @Output() tabShow!: () => unknown | void;
//
//    private useTab: UseTab;
//
//    constructor(
//        @Inject(ElementRef) elRef: ElementRef<HTMLElement>,
//        @Inject(Renderer2) renderer: Renderer2,
//        @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef
//    ) {
//        lapi(
//            createContextUseTab,
//            createViewRef
//        )(
//            (this.useTab = {
//                context: null,
//                elementRef: elRef,
//                input: this,
//                renderer,
//                // templateRef,
//                viewContainerRef,
//                viewRef: {} as EmbeddedViewRef<ContextTemplate<T>> | null,
//            })
//        );
//    }
//    ngAfterContentInit(): void {
//        lapi((useTab: UseTab) => {
//            const { input, tabs } = useTab;
//            toggleTab(useTab);
//            tabs?.filter((_tab) => _tab.nativeElement).map((tab) => {
//                 outZone(ngZone, () => tab.nativeElement.addEventListener('click', () => {
//                    input.tabOrderId = tab.orderId;
//                    toggleTab(useTab);
//                }));
//            });
//            return useTab;
//        })(this.useTab);
//    }
//
//    ngOnChanges(changes: SimpleChanges): void {
//        lapi((useTab: UseTab) => {
//            useTab.changes = changes;
//            useTab.input = this;
//            useTab.tabs = changes['tabTabs'].currentValue;
//            return useTab;
//        }, addTab)(this.useTab);
//    }
//
//    ngOnDestroy() {
//        lapi(
//            unsubscribesFinal,
//            clearViewContainerRef,
//            destroyViewRef
//        )(this.useTab);
//    }
// }
