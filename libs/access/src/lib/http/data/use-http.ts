import { HttpClient } from '@angular/common/http';
import { SimpleChanges } from '@angular/core';

import { Use } from '../../directive';
import { ContextHttp } from './context-http';
import { OptionHttp } from './option-http';
import { StrategyHttp } from './strategy-http';

export interface UseHttp extends Use<HttpClient> {
    changes: SimpleChanges;
    context: ContextHttp;
    data: unknown;
    input: OptionHttp;
    fields: StrategyHttp[] | null;
    httpClient: HttpClient;
    params: OptionHttp[] | null;
    strategy: StrategyHttp | null;
}
