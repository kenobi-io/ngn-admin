import { Context } from '@ngn-template/cdk';
import { Observable } from 'rxjs';

export interface ContextHttp<T> extends Context<T> {
    $implicit: Observable<T>;
    data: Observable<T>;
}
