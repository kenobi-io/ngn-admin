import { Overlay } from '../../../data';
import { backdropDisposeOverlay } from './backdrop-dispose-overlay';

export const backdropClickHandlerOverlayRef = function <T>(
    this: Overlay<T>,
    event: MouseEvent | Event
): void {
    this.backdropClick.next(event);
};

export const backdropTransitionendHandlerOverlayRef = function <T>(
    this: Overlay<T>,
    event: TransitionEvent | Event
): void {
    this.backdrop = event.target as HTMLElement;
    backdropDisposeOverlay()({ overlay: this });
};
