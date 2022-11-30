import { Bounden } from '@core-template';

import { Use } from './use';

export type UnsubscribeUse<T> = Bounden<Use<T>, 'subscriptions'>;

/**
 * `Role` unsubscribe from all subscribes in directive.
 * @param use
 * @returns `Use` instance reference
 */
export const unsubscribesFinal = <T>(use: UnsubscribeUse<T>): Use<T> => {
    const { subscriptions } = use;
    subscriptions?.forEach((subscription) => {
        subscription.unsubscribe();
    });
    use.subscriptions = null;

    return use as Use<T>;
};
