import { inject, InjectionToken } from '@angular/core';
import { setPropertiesValue } from '@core-template';

export const changes = <T>(
    target: T,
    change?: Partial<T>,
    token?: InjectionToken<T>
): void => {
    change
        ? setPropertiesValue(target, change)
        : token && (change = inject(token));
};
