import { Observable } from 'rxjs';

import { OptionsRest } from './options-rest';

export type RestApi = {
    get<T>(url: string, option?: OptionsRest, log?: string): Observable<T>;
    post<T, R>(
        url: string,
        body: R,
        option?: OptionsRest,
        log?: string
    ): Observable<T>;
    put<T, R>(
        url: string,
        body: R,
        option?: OptionsRest,
        log?: string
    ): Observable<T>;
    patch<T, R>(
        url: string,
        body: R,
        option?: OptionsRest,
        log?: string
    ): Observable<T>;
    delete<T>(url: string, option?: OptionsRest, log?: string): Observable<T>;
    head<T>(url: string, option?: OptionsRest, log?: string): Observable<T>;
    options<T>(url: string, option?: OptionsRest, log?: string): Observable<T>;
    jsonp<T>(url: string, callbackParam: string, log?: string): Observable<T>;
    request<T>(
        method: string,
        url: string,
        option?: OptionsRest,
        log?: string
    ): Observable<T>;
};
