import { disposeBackdropAttach } from './dispose-backdrop-attach';

export const backdropClickHandler = function (event: MouseEvent): void {
    this.backdropClick.next(event);
};

export const backdropTransitionendHandler = function (
    event: TransitionEvent
): void {
    this.eventTargetDisposeBackdrop = event.target;
    disposeBackdropAttach(this);
};
