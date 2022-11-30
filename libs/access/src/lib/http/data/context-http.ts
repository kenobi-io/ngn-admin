import { Observable } from 'rxjs';

import { Context } from '../../directive';

export interface ContextHttp<T> extends Context<T> {
    $implicit: Observable<T>;
    data: Observable<T>;
}
