import { Use } from './use';

/**
 * `Role` unsubscribe from all subscribes in directive.
 * @param use
 * @returns `Use` instance reference
 */
export const unsubscribeFromAll = <T extends Use>(use: T): T => {
    let { subscriptions } = use;
    subscriptions?.forEach((subscription) => {
        subscription.unsubscribe();
    });
    subscriptions = null;

    return use;
};
