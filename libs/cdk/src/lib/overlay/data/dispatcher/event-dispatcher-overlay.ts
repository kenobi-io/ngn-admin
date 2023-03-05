import { KeyboardDispatcherOverlay, OutsideClickDispatcherOverlay } from '..';

export type EventDispatcherOverlay<T> =
    | OutsideClickDispatcherOverlay<T>
    | KeyboardDispatcherOverlay<T>;
