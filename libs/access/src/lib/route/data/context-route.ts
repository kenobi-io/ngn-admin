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
import { Context } from '@ngn-template/cdk';

export interface ContextRoute extends Context<ActivatedRoute> {
    [name: string]: ContextRoute[keyof ContextRoute];
    children: ActivatedRoute[];
    component: Type<unknown> | string;
    data: Data;
    firstChild: ActivatedRoute;
    fragment: string;
    outlet: string;
    paramMap: ParamMap;
    params: Params;
    parent: ActivatedRoute;
    pathFromRoot: ActivatedRoute[];
    queryParamMap: ParamMap;
    queryParams: Params;
    root: ActivatedRoute;
    routeConfig: Route;
    snapshot: ActivatedRouteSnapshot;
    url: UrlSegment[];
}

export type KeyofContextRoute = ContextRoute[keyof ContextRoute];
