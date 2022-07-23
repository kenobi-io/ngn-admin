import { HttpClient } from '@angular/common/http';
import { SimpleChanges } from '@angular/core';

import { ContextUse, Use } from '../../directive';
import { OptionHttp } from './option-http';
import { StrategyHttp } from './strategy-http';

export interface UseHttp extends Use {
    changes?: SimpleChanges;
    context: ContextUse | null;
    input: OptionHttp;
    fields?: StrategyHttp[] | null;
    httpClient: HttpClient;
    params?: OptionHttp[] | null;
    strategy?: StrategyHttp | null;
}
