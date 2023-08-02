import { KeyboardDispatcherOverlay, OutsideClickDispatcherOverlay } from '..';

export type EventDispatcherOverlay =
    | OutsideClickDispatcherOverlay
    | KeyboardDispatcherOverlay;
