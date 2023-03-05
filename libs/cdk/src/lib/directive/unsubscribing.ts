import { unsubscribing } from '@core-template';

import { Subscruse } from './data';

/**
 * `Role` unsubscribe from all subscribes in directive.
 * @param use
 * @returns `Use` instance reference
 */
export const unsubscrusing = <T>(use: Subscruse<T>): Subscruse<T> => {
    unsubscribing(use.subscriptions);
    return use;
};
