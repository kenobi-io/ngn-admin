import { Bounden } from '@core-template';

import { Http, UseHttp } from '../data';

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
