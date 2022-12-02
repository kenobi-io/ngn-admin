import { inject, Injectable, InjectionToken } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

import { HTTP_HANDLER_ERROR } from './handle-error-request';
import { HTTP_CLIENT } from './http-client';
import { HTTP_LOGGER } from './http-logger';
import { OptionsRest } from './options-rest';
import { RestApi } from './rest-api';

@Injectable({ providedIn: 'root' })
export class RestApiService implements RestApi {
    private readonly httpClient = inject(HTTP_CLIENT);
    private readonly logger = inject(HTTP_LOGGER);
    private readonly handleErrorRequest = inject(HTTP_HANDLER_ERROR);

    private requestWithLog<T>(
        httpRequest: () => Observable<T>,
        options: {
            url: string;
            method: string;
            log?: string;
        }
    ): Observable<T> {
        const { log, method, url } = options;
        const message = log ? log : `[http ${method}]: ${url}`;
        return httpRequest().pipe(
            tap(() => this.logger && this.logger.log(message)),
            catchError(this.handleErrorRequest)
        );
    }

    public get<T>(
        url: string,
        option?: OptionsRest,
        log?: string
    ): Observable<T> {
        return this.requestWithLog(() => this.httpClient.get<T>(url, option), {
            log,
            method: 'get',
            url,
        });
    }

    public post<T, R>(
        url: string,
        body: R,
        option?: OptionsRest,
        log?: string
    ): Observable<T> {
        return this.requestWithLog(
            () => this.httpClient.post<T>(url, body, option),
            {
                log,
                method: 'post',
                url,
            }
        );
    }

    public put<T, R>(
        url: string,
        body: R,
        option?: OptionsRest,
        log?: string
    ): Observable<T> {
        return this.requestWithLog(
            () => this.httpClient.put<T>(url, body, option),
            {
                log,
                method: 'put',
                url,
            }
        );
    }

    public patch<T, R>(
        url: string,
        body: R,
        option?: OptionsRest,
        log?: string
    ): Observable<T> {
        return this.requestWithLog(
            () => this.httpClient.patch<T>(url, body, option),
            {
                log,
                method: 'patch',
                url,
            }
        );
    }

    public delete<T>(
        url: string,
        option?: OptionsRest,
        log?: string
    ): Observable<T> {
        return this.requestWithLog(
            () => this.httpClient.delete<T>(url, option),
            {
                log,
                method: 'delete',
                url,
            }
        );
    }

    public head<T>(
        url: string,
        option?: OptionsRest,
        log?: string
    ): Observable<T> {
        return this.requestWithLog(() => this.httpClient.head<T>(url, option), {
            log,
            method: 'head',
            url,
        });
    }

    public options<T>(
        url: string,
        option?: OptionsRest,
        log?: string
    ): Observable<T> {
        return this.requestWithLog(
            () => this.httpClient.options<T>(url, option),
            {
                log,
                method: 'options',
                url,
            }
        );
    }

    public jsonp<T>(
        url: string,
        callbackParam: string,
        log?: string
    ): Observable<T> {
        return this.requestWithLog(
            () => this.httpClient.jsonp<T>(url, callbackParam),
            {
                log,
                method: 'jsonp',
                url,
            }
        );
    }

    public request<T>(
        method: string,
        url: string,
        option?: OptionsRest,
        log?: string
    ): Observable<T> {
        return this.requestWithLog(
            () => this.httpClient.request<T>(method, url, option),
            {
                log,
                method: 'request',
                url,
            }
        );
    }
}

export const REST_API_SERVICE = new InjectionToken<RestApi>(
    '[REST_API_SERVICE] rest service with logging http request',
    {
        factory: () => inject(RestApiService),
    }
);
