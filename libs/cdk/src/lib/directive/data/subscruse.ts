import { Subscription } from 'rxjs';

import { Ref } from './ref';

export type Subscribed = {
    subscriptions: Subscription[];
};

/**
 * Description structure data by interaction with directive - \
 * the facade of the directive with subscription option.
 */
export type Subscruse<T> = Ref<T> & Partial<Subscribed>;
