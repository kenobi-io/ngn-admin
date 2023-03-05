import { inject, TemplateRef } from '@angular/core';
import { Bounden } from '@core-template';
import { Context, VIEW_CONTAINER_REF_TOKEN } from '@ngn-template/cdk';

import { CONFIG_STRATEGY_HTTP, Http, UseHttp } from '../data';
import { REST_API_SERVICE } from './rest/rest-api.service';

export type PropertyCreateUseHttp =
    | 'fields'
    | 'input'
    | 'restApi'
    | 'templateRef'
    | 'viewContainerRef';

export type CreateUseHttp<T> = Bounden<UseHttp<T>, PropertyCreateUseHttp>;

export type DirectiveCreateUseHttp<T> = Omit<Http<T>, 'use'> & {
    use: UseHttp<T>;
};

export const createUseHttp = <T>(
    directive: DirectiveCreateUseHttp<T>
): UseHttp<T> => {
    directive.use = {
        fields: inject(CONFIG_STRATEGY_HTTP),
        input: directive,
        restApi: inject(REST_API_SERVICE),
        templateRef: inject(TemplateRef<Context<T>>),
        viewContainerRef: inject(VIEW_CONTAINER_REF_TOKEN),
    };
    return directive.use;
};
