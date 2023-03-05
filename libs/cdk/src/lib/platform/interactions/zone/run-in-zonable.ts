import { NgZone } from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

/*
 * Creates an observable where all callbacks are executed inside a given zone
 *
 * @param zone
 */
export const runInZonable = <T>(
    ngZone: NgZone
): MonoTypeOperatorFunction<T> => {
    return (source: Observable<T>): Observable<T> => {
        return new Observable((observer) => {
            const next = (value: T): void =>
                ngZone.run(() => observer.next(value));
            const error = (error: unknown): void =>
                ngZone.run(() => observer.error(error));
            const complete = (): void => ngZone.run(() => observer.complete());
            return source.subscribe({ complete, error, next });
        });
    };
};
