import { Type } from '@angular/core';
import { convertToParamMap } from '@angular/router';

import { UseRoute } from '../use-route';

export const createContextRoute = <T extends UseRoute>(useRoute: T): T => {
    const { route } = useRoute;
    useRoute.context = {
        $implicit: route,
        get children() {
            return route.children;
        },
        get component() {
            return route.component as Type<unknown> | string;
        },
        data: null,
        get firstChild() {
            return route.firstChild;
        },
        fragment: null,
        get outlet() {
            return route.outlet;
        },
        paramMap: convertToParamMap({}),
        params: {},
        get parent() {
            return route.parent;
        },
        get pathFromRoot() {
            return route.pathFromRoot;
        },
        queryParamMap: convertToParamMap({}),
        queryParams: {},
        get root() {
            return route.root;
        },
        get routeConfig() {
            return route.routeConfig;
        },
        get snapshot() {
            return route.snapshot;
        },
        url: [],
    };
    return useRoute;
};
