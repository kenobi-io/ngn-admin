import { OverlayRef } from '../../../data';
import { backdropDisposeOverlayRef } from './backdrop-dispose-overlay-ref';

export const backdropClickHandlerOverlayRef = function <T>(
    this: OverlayRef<T>,
    event: MouseEvent
): void {
    this.backdropClick.next(event);
};

export const backdropTransitionendHandlerOverlayRef = function <T>(
    this: OverlayRef<T>,
    event: TransitionEvent
): void {
    this.backdrop = event.target as HTMLElement;
    backdropDisposeOverlayRef(this);
};
