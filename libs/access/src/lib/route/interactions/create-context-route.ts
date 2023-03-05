import { Type } from '@angular/core';
import { convertToParamMap } from '@angular/router';

import { UseRoute } from '../data';

export const createContextRoute = <T extends UseRoute>(use: T): T => {
    const { route } = use;
    use.context = {
        $implicit: route,
        get children() {
            return this.$implicit.children;
        },
        get component() {
            return this.$implicit.component as Type<unknown> | string;
        },
        data: undefined,
        get firstChild() {
            return this.$implicit.firstChild;
        },
        fragment: undefined,
        get outlet() {
            return this.$implicit.outlet;
        },
        paramMap: convertToParamMap({}),
        params: {},
        get parent() {
            return this.$implicit.parent;
        },
        get pathFromRoot() {
            return this.$implicit.pathFromRoot;
        },
        queryParamMap: convertToParamMap({}),
        queryParams: {},
        get root() {
            return this.$implicit.root;
        },
        get routeConfig() {
            return this.$implicit.routeConfig;
        },
        get snapshot() {
            return this.$implicit.snapshot;
        },
        url: [],
    };
    return use;
};
