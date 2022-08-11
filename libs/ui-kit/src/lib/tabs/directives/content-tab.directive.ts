/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
    AfterContentInit,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    Renderer2,
    SimpleChanges,
    // TemplateRef,
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

import { Tab, UseTab } from '../data';
import { addTab, createContextTab, toggleTab } from '../interactions';

@Directive({
    exportAs: 'tabContent',
    selector: '[tabContent], tab-content',
    standalone: true,
})
export class ContentTabDirective
    implements AfterContentInit, OnChanges, OnDestroy
{
    @Input() tabActiveStyle!: string;
    @Input() tabInactiveStyle!: string;
    @Input() tabOrderId!: string;
    @Input() tabTabs!: Tab[];
    @Output() tabShow!: () => unknown | void;

    private useTab: UseTab;

    constructor(
        @Inject(ElementRef) elRef: ElementRef<HTMLElement>,
        @Inject(Renderer2) renderer: Renderer2,
        @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef // private readonly templateRef?: TemplateRef<ContextUse>
    ) {
        lapi(
            createContextTab,
            createViewRef
        )(
            (this.useTab = {
                context: null,
                elRef,
                input: this,
                renderer,
                // templateRef,
                viewContainerRef,
                viewRef: {} as EmbeddedViewRef<ContextUse> | null,
            })
        );
    }
    ngAfterContentInit(): void {
        lapi((useTab: UseTab) => {
            const { input, tabs } = useTab;
            toggleTab(useTab);
            tabs?.filter((_tab) => _tab.nativeElement).map((tab) => {
                tab.nativeElement.addEventListener('click', () => {
                    input.tabOrderId = tab.orderId;
                    toggleTab(useTab);
                });
            });
            return useTab;
        })(this.useTab);
    }
    // ngAfterViewInit(): void {
    //     lapi((useTab: UseTab) => {
    //         const { input, tabs } = useTab;
    //         toggleTab(useTab);
    //         tabs?.map((tab) => {
    //             tab.nativeElement?.addEventListener('click', () => {
    //                 input.tabOrderId = tab.orderId;
    //                 // toggleTab(useTab);
    //             });
    //         });
    //         return useTab;
    //     })(this.useTab);
    // }
    ngOnChanges(changes: SimpleChanges): void {
        lapi((useTab: UseTab) => {
            useTab.changes = changes;
            useTab.input = this;
            useTab.tabs = changes['tabTabs'].currentValue;
            return useTab;
        }, addTab)(this.useTab);
    }

    ngOnDestroy() {
        lapi(
            unsubscribeFromAll,
            clearViewContainerRef,
            destroyViewRef
        )(this.useTab);
    }
}

// class Tabs {
//     constructor(items = [], options = {}) {
//         this._items = items;
//         this._activeTab = options ? this.getTab(options.defaultTabId) : null;
//         this._options = { ...Default, ...options };
//         this._init();
//     }

//     getActiveTab() {
//         return this._activeTab;
//     }
//     getTab(id) {
//         return this._items.filter((t) => t.id === id)[0];
//     }
//     show(id, forceShow = false) {
//         const tab = this.getTab(id);

//         // don't do anything if already active
//         if (tab === this._activeTab && !forceShow) {
//             return;
//         }

//         // hide other tabs
//         this._items.map((t) => {
//             if (t !== tab) {
//                 t.triggerEl.classList.remove(
//                     ...this._options.activeClasses.split(' ')
//                 );
//                 t.triggerEl.classList.add(
//                     ...this._options.inactiveClasses.split(' ')
//                 );
//                 t.targetEl.classList.add('hidden');
//                 t.triggerEl.setAttribute('aria-selected', false);
//             }
//         });

//         // show active tab
//         tab.triggerEl.classList.add(...this._options.activeClasses.split(' '));
//         tab.triggerEl.classList.remove(
//             ...this._options.inactiveClasses.split(' ')
//         );
//         tab.triggerEl.setAttribute('aria-selected', true);
//         tab.targetEl.classList.remove('hidden');

//         this._setActiveTab(tab);

//         // callback function
//         this._options.onShow(this, tab);
//     }
//     _init() {
//         if (this._items.length) {
//             // set the first tab as active if not set by explicitly
//             if (!this._activeTab) {
//                 this._setActiveTab(this._items[0]);
//             }

//             // force show the first default tab
//             this.show(this._activeTab.id, true);

//             // show tab content based on click
//             this._items.map((tab) => {
//                 tab.triggerEl.addEventListener('click', () => {
//                     this.show(tab.id);
//                 });
//             });
//         }
//     }

//     _setActiveTab(tab) {
//         this._activeTab = tab;
//     }
// }

// window.Tabs = Tabs;

// function initTabs() {
//     document.querySelectorAll('[data-tabs-toggle]').forEach((triggerEl) => {
//         const tabElements = [];
//         let defaultTabId = null;
//         triggerEl.querySelectorAll('[role="tab"]').forEach((el) => {
//             const isActive = el.getAttribute('aria-selected') === 'true';
//             tabElements.push(tab);
//             if (isActive) {
//                 defaultTabId = tab.id;
//             }
//         });
//         new Tabs(tabElements, {
//             defaultTabId: defaultTabId,
//         });
//     });
// }
