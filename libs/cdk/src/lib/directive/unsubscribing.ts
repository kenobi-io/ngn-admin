import { Bounden } from '@core-template';

import { Subscruse } from './subscruse';

export type UnsubscribeUse<T> = Bounden<Subscruse<T>, 'subscriptions'>;

/**
 * `Role` unsubscribe from all subscribes in directive.
 * @param use
 * @returns `Use` instance reference
 */
export const unsubscribing = <T>(use: UnsubscribeUse<T>): Subscruse<T> => {
    const { subscriptions } = use;
    subscriptions?.forEach((subscription) => {
        subscription.unsubscribe();
    });
    use.subscriptions = null;

    return use as Subscruse<T>;
};
