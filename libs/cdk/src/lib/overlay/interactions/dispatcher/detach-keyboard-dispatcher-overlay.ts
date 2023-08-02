import { Finish, Mono, unary } from '@core-template';

import { KeyboardDispatcherOverlay } from '../../data';

/** Detaches the global keyboard event listener. */
export const detachKeyboardDispatcherOverlay = (
    finish?: Finish
): Mono<KeyboardDispatcherOverlay> =>
    unary((dispatcher) => {
        const { document, isAttached, listener } = dispatcher;
        if (isAttached && document && listener) {
            document.body.removeEventListener('keydown', listener);
            dispatcher.isAttached = false;
        }
    }, finish);
