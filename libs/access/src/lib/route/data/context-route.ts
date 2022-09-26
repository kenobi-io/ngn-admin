import { Type } from '@angular/core';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Data,
    ParamMap,
    Params,
    Route,
    UrlSegment,
} from '@angular/router';

import { ContextTemplate } from '../../directive';

export type KeyofContextRoute = ContextRoute[keyof ContextRoute];

export interface ContextRoute extends ContextTemplate<ActivatedRoute> {
    [name: string]: ContextRoute[keyof ContextRoute];
    children: ActivatedRoute[];
    component: Type<unknown> | string;
    data: Data | null;
    firstChild: ActivatedRoute | null;
    fragment: string | null;
    outlet: string;
    paramMap: ParamMap;
    params: Params;
    parent: ActivatedRoute | null;
    pathFromRoot: ActivatedRoute[];
    queryParamMap: ParamMap;
    queryParams: Params;
    root: ActivatedRoute;
    routeConfig: Route | null;
    snapshot: ActivatedRouteSnapshot;
    url: UrlSegment[];
}
