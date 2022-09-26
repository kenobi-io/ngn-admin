import {
    Router,
    RouteReuseStrategy,
    RouterState,
    TitleStrategy,
    UrlHandlingStrategy,
} from '@angular/router';
import { Observable } from 'rxjs';

import { ContextTemplate } from '../../directive';

export type KeyofContextRouter = ContextRouter[keyof ContextRouter];

export interface ContextRouter extends ContextTemplate<Router> {
    [name: string]: ContextRouter[keyof ContextRouter];
    data: unknown;
    events: Observable<unknown> | null;
    routerState: RouterState | null;
    navigated: boolean | null;
    urlHandlingStrategy: UrlHandlingStrategy | null;
    routeReuseStrategy: RouteReuseStrategy | null;
    titleStrategy: TitleStrategy | null;
    url: string;
}
