import { OutBounden } from '@core-template';

import { using } from '../directive';
import { Attach } from './attach/attach';
import { disposeScrollStrategyAttach } from './attach/dispose-scroll-strategy-attach';
import { hasAttached } from './attach/has-attached';

export type UpdateScrollStrategyOverlayRef<T> = OutBounden<
    Attach<T>,
    | 'attachResult'
    | 'backdrop'
    | 'detachmentResult'
    | 'direction'
    | 'locationChanges'
    | 'panelClass'
    | 'portal'
    | 'sizeConfig'
    | 'toggleClasses'
    | 'toggleDirection'
    | 'togglePositionStrategy'
    | 'animationsDisabled'
    | 'backdropClickHandler'
    | 'backdropTimeout'
    | 'backdropTransitionendHandler'
    | 'config'
    | 'document'
    | 'host'
    | 'keyboardDispatcher'
    | 'location'
    | 'outsideClickDispatcher'
    | 'pane'
    | 'previousHostParent'
    | 'positionStrategy'
    | 'scrollStrategy'
>;

/** Switches to a new scroll strategy. */
export const updateScrollStrategyOverlayRef = <T>(
    use: UpdateScrollStrategyOverlayRef<T>
): Attach<T> => {
    return using(use, () => {
        const { portalOutlet, strategy } = use;

        if (strategy === use.scrollStrategy) {
            return;
        }
        disposeScrollStrategyAttach(use);
        use.scrollStrategy = strategy;

        if (hasAttached(portalOutlet)) {
            strategy.attach(use);
            strategy.enable();
        }
    });
};
