import {
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
} from '@angular/core';
import {
    clearViewContainerRef,
    createViewRef,
    destroyViewRef,
} from '@ngn-template/cdk';
import { pipe } from 'rxjs';

import { ContextHttp, UseHttp } from '../data';
import { Http } from '../data/http';
import {
    contextCreateHttp,
    createUseHttp,
    findStrategyHttp,
    requestHttp,
} from '../interactions';

@Directive({
    selector: '[http]',
    standalone: true,
})
export class HttpDirective<T> implements Http<T>, OnChanges, OnDestroy {
    @Input() httpInstanceof!: T;
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
    use: UseHttp<T> = createUseHttp(this);

    ngOnChanges(changes: SimpleChanges): void {
        pipe(
            (use: UseHttp<T>) => (use.changes = changes) && use,
            contextCreateHttp,
            createViewRef<T, UseHttp<T>>,
            findStrategyHttp,
            requestHttp
        )(this.use);
    }

    ngOnDestroy(): void {
        pipe(clearViewContainerRef, destroyViewRef)(this.use);
    }

    static ngTemplateContextGuard<T>(
        dir: HttpDirective<T>,
        ctx: unknown
    ): ctx is ContextHttp<T> {
        return true;
    }
}
