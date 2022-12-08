import { OutBounden } from '@core-template';

import { using } from '../../directive';
import { Attach } from './attach';
import { disposeBackdropAttach } from './dispose-backdrop-attach';
import { disposeScrollStrategyAttach } from './dispose-scroll-strategy-attach';
import { hasAttached } from './has-attached';

export type DisposeAttach<T> = OutBounden<
    Attach<T>,
    | 'attachResult'
    | 'backdrop'
    | 'detachmentResult'
    | 'direction'
    | 'panelClass'
    | 'portal'
    | 'sizeConfig'
    | 'strategy'
    | 'toggleClasses'
    | 'toggleDirection'
    | 'togglePositionStrategy'
    | 'animationsDisabled'
    | 'backdropTimeout'
    | 'config'
    | 'document'
    | 'host'
    | 'location'
    | 'pane'
    | 'previousHostParent'
    | 'scrollStrategy'
>;

/** Cleans up the overlay from the DOM. */
export const disposeAttach = <T>(use: DisposeAttach<T>): Attach<T> => {
    return using(use, () => {
        const {
            _keydownEvents,
            _outsidePointerEvents,
            attachments,
            backdropClick,
            detachments,
            keyboardDispatcher,
            locationChanges,
            outsideClickDispatcher,
            portalOutlet,
            positionStrategy,
        } = use;
        const isAttached = hasAttached(portalOutlet);
        positionStrategy?.dispose();
        disposeScrollStrategyAttach(use);
        disposeBackdropAttach(use);
        locationChanges.unsubscribe();
        keyboardDispatcher.remove(use);
        portalOutlet.dispose();
        attachments.complete();
        backdropClick.complete();
        _keydownEvents.complete();
        _outsidePointerEvents.complete();
        outsideClickDispatcher.remove(use);
        use.host?.remove();
        use.previousHostParent = use.pane = use.host = undefined;
        isAttached && detachments.next();
        detachments.complete();
    });
};
