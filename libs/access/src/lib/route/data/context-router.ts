import {
    Router,
    RouteReuseStrategy,
    RouterState,
    TitleStrategy,
    UrlHandlingStrategy,
} from '@angular/router';
import { Context } from '@ngn-template/cdk';
import { Observable } from 'rxjs';

export interface ContextRouter extends Context<Router> {
    [name: string]: ContextRouter[keyof ContextRouter];
    data: unknown;
    events: Observable<unknown>;
    routerState: RouterState;
    navigated: boolean;
    urlHandlingStrategy: UrlHandlingStrategy;
    routeReuseStrategy: RouteReuseStrategy;
    titleStrategy: TitleStrategy;
    url: string;
}

export type KeyofContextRouter = ContextRouter[keyof ContextRouter];
