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
    ContextUse,
    createViewRef,
    destroyViewRef,
    EmbedNull,
    unsubscribeFromAll,
} from '../../directive';
import { CONFIG_STRATEGY_HTTP, OptionHttp, UseHttp } from '../data';
import {
    contextCreateHttp,
    findStrategyHttp,
    requestHttp,
} from '../interactions';

@Directive({ selector: '[http]', standalone: true })
export class HttpDirective implements OnChanges, OnDestroy {
    @Input() httpCallback!: string;
    @Input() httpDelete!: string;
    @Input() httpGet!: string;
    @Input() httpHead!: string;
    @Input() httpJsonp!: string;
    @Input() httpOptions!: string;
    @Input() httpPatch!: string;
    @Input() httpPost!: string;
    @Input() httpPut!: string;
    @Input() httpSend!: unknown;
    @Input() httpWith!: unknown;

    private useHttp: UseHttp;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly templateRef: TemplateRef<ContextUse>,
        private readonly viewContainerRef: ViewContainerRef
    ) {
        lapi(
            contextCreateHttp,
            createViewRef
        )(
            (this.useHttp = {
                context: {} as ContextUse,
                fields: CONFIG_STRATEGY_HTTP,
                httpClient,
                input: this as unknown as OptionHttp,
                templateRef,
                viewContainerRef,
                viewRef: {} as EmbedNull,
            })
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        lapi(
            findStrategyHttp,
            requestHttp
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
