import { Subscription } from 'rxjs';

import { Use } from './use';

/**
 * Description structure data by interaction with directive - \
 * the facade of the directive with subscription option.
 */
export interface Subscruse<T> extends Use<T> {
    subscriptions: Subscription[] | null;
}
