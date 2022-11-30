import {
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
} from '@angular/core';
import { pipe } from 'rxjs';

import {
    clearViewContainerRef,
    createViewRef,
    destroyViewRef,
} from '../../directive';
import { ContextHttp, UseHttp } from '../data';
import { Http } from '../data/http';
import {
    contextCreateHttp,
    createUseHttp,
    findStrategyHttp,
    requestHttp,
} from '../interactions';

@Directive({
    exportAs: 'httpProperty',
    selector: '[http]',
    standalone: true,
})
export class HttpDirective<T> implements Http<T>, OnChanges, OnDestroy {
    static ngTemplateContextGuard<T>(
        dir: HttpDirective<T>,
        ctx: unknown
    ): ctx is ContextHttp<T> {
        return true;
    }
    @Input() httpTypeof!: T;
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
}

//export type Actions = unknown;
//export type ActionResults = any;

//<form *backendRoute="'GetReservations'; let params;">
//export class ContextRoute<T> {
//    $implicit!: T;
//    subscribe!: T;
//
//    constructor(value: T) {
//        this.$implicit = value;
//        this.subscribe = value;
//    }
//}

//    <T extends keyof Actions & keyof ActionResults> {
//    static ngTemplateContextGuard<
//        T extends keyof Actions & keyof ActionResults
//    >(dir: RouteDirective<T>, ctx: unknown): ctx is Context<Actions[T]> {
//        return true;
//    }
//
//    @Input('backendRoute') typeToken!:
//        | T
//        | [T, (result: ActionResults[T]) => void];
//
//    constructor(
//        // eslint-disable-next-line no-use-before-define
//        private tpl: TemplateRef<Context<
//        [T]>>,
//        private vcr: ViewContainerRef
//    ) {
//        console.log('type');
//        vcr.createEmbeddedView<Context<T>>(tpl);
//    }

//@Directive({
//selector: '[http]',
//    standalone: true,
//})
//export class UserHttpDirective extends HttpDirective<User> {
//    static ngTemplateContextGuard(
//        dir: UserHttpDirective,
//        ctx: unknown
//    ): ctx is ContextHttp<User[]> {
//        return true;
//    }
//    templateRef = inject(TemplateRef<ContextHttp<User>>);
//
//    viewContainerRef = inject(ViewContainerRef);
//
//    constructor() {
//        super();
//    }
//
//constructor() {
//    super();
//    this.use.operators = [
//        map((result) => {
//            console.log('result', result);
//            return result;
//        }) as never,
//    ];
//    const dir = inject(HttpDirective<User>);
//    console.log('dir', dir.httpGet);
//}
//
//ngOnChanges(changes: SimpleChanges): void {
//    pipe(
//        () =>
//            (this.use.operators = [
//                map((result) => console.log('result', result) && result)
//            ]),
//        () => super.ngOnChanges(changes)
//    )(this.use);
//}
//}
