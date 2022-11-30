import { SimpleChanges } from '@angular/core';

import { Use } from '../../directive';
import { RestApi } from '../interactions';
import { ContextHttp } from './context-http';
import { InputPropertyHttp } from './input-property-http';
import { StrategyHttp } from './strategy-http';

export interface UseHttp<T> extends Use<T> {
    changes: SimpleChanges;
    context: ContextHttp<T>;
    input: InputPropertyHttp;
    fields: StrategyHttp[];
    restApi: RestApi;
    params: InputPropertyHttp[];
    strategy: StrategyHttp;
}
