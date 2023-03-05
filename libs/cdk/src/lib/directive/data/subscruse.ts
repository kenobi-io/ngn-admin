import { Subscription } from 'rxjs';

import { Use } from './use';

export type Subscribed = {
    subscriptions: Subscription[];
};

/**
 * Description structure data by interaction with directive - \
 * the facade of the directive with subscription option.
 */
export type Subscruse<T> = Use<T> & Partial<Subscribed>;
