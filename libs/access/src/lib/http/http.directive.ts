import { HttpClient } from '@angular/common/http';
import {
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { lapi } from '@relax';

import {
    clearViewContainerRef,
    createViewRef,
    destroyViewRef,
    unsubscribeFromAll,
} from '../directive';
import { CONFIG_STRATEGY_HTTP } from './config-strategy-http';
import { ContextHttp } from './context-http';
import { contextCreateHttp } from './create/context-create-http';
import { request } from './create/request';
import { findStrategyHttp } from './find-strategy-http';
import { OptionHttp } from './option-http';
import { UseHttp } from './use-http';

@Directive({ selector: '[http]' })
export class HttpDirective implements OnChanges, OnDestroy {
    @Input() optionHttp: Partial<OptionHttp> = {};

    private useHttp: UseHttp;

    constructor(
        private http: HttpClient,
        private templateRef: TemplateRef<ContextHttp>,
        private viewContainerRef: ViewContainerRef
    ) {
        lapi(
            contextCreateHttp,
            createViewRef
        )(
            (this.useHttp = {
                fields: CONFIG_STRATEGY_HTTP,
                http,
                optionHttp: this.optionHttp,
                templateRef,
                viewContainerRef,
            } as UseHttp)
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        lapi(
            findStrategyHttp,
            request
        )((this.useHttp.changes = changes) && this.useHttp);
    }

    ngOnDestroy(): void {
        lapi(
            unsubscribeFromAll,
            clearViewContainerRef,
            destroyViewRef
        )(this.useHttp);
    }
}
