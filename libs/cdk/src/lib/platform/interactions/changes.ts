import { inject, InjectionToken } from '@angular/core';
import { Mono, mono, setPropertiesValue } from '@core-template';

type Changes = {
    <T>(change?: Partial<T>, token?: InjectionToken<T>): Mono<T>;
    <T>(target: T, change?: Partial<T>, token?: InjectionToken<T>): void;
};

export const changes: Changes = <T>(
    target?: T,
    change?: Partial<T>,
    token?: InjectionToken<T>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any =>
    target
        ? set(target, change, token)
        : mono((target) => set(target, change, token));

const set = <T>(
    target: T,
    change?: Partial<T>,
    token?: InjectionToken<T>
): void => {
    if (change) {
        setPropertiesValue(target, change);
    } else if (token) {
        change = inject(token);
    }
};
