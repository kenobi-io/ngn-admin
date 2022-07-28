import {
    Router,
    RouteReuseStrategy,
    RouterState,
    TitleStrategy,
    UrlHandlingStrategy,
} from '@angular/router';
import { Observable } from 'rxjs';

import { ContextUse } from '../../directive';

export type KeyofContextRouter = ContextRouter[keyof ContextRouter];

export interface ContextRouter extends ContextUse {
    [name: string]: ContextRouter[keyof ContextRouter];
    $implicit: Router;
    data: unknown;
    events: Observable<unknown>;
    routerState: RouterState;
    navigated: boolean;
    urlHandlingStrategy: UrlHandlingStrategy;
    routeReuseStrategy: RouteReuseStrategy;
    titleStrategy?: TitleStrategy;
    url: string;
}
