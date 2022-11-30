import { inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { Bounden } from '@core-template';

import { Context } from '../../directive';
import { CONFIG_STRATEGY_HTTP, UseHttp } from '../data';
import { Http } from '../data/http';
import { REST_API_SERVICE } from './rest/rest-api.service';

export type PropertyCreateUseHttp =
    | 'fields'
    | 'input'
    | 'restApi'
    | 'templateRef'
    | 'viewContainerRef';

export type CreateUseHttp<T> = Bounden<UseHttp<T>, PropertyCreateUseHttp>;

export type DirectiveCreateUseHttp<T> = Omit<Http<T>, 'use'> & {
    use: CreateUseHttp<T>;
};

export const createUseHttp = <T>(
    directive: DirectiveCreateUseHttp<T>
): UseHttp<T> => {
    return (directive.use = {
        fields: inject(CONFIG_STRATEGY_HTTP),
        input: directive,
        restApi: inject(REST_API_SERVICE),
        templateRef: inject(TemplateRef<Context<T>>),
        viewContainerRef: inject(ViewContainerRef),
    } as unknown as UseHttp<T>);
};
