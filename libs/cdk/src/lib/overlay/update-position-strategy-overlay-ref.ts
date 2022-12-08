import { OutBounden } from '@core-template';

import { using } from '../directive';
import { Attach } from './attach/attach';
import { hasAttached } from './attach/has-attached';

export type UpdatePositionStrategyOverlayRef<T> = OutBounden<
    Attach<T>,
    | 'attachResult'
    | 'backdrop'
    | 'detachmentResult'
    | 'direction'
    | 'locationChanges'
    | 'panelClass'
    | 'portal'
    | 'sizeConfig'
    | 'strategy'
    | 'toggleClasses'
    | 'toggleDirection'
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

/** Switches to a new position strategy and updates the overlay position. */
export const updatePositionStrategyOverlayRef = <T>(
    use: UpdatePositionStrategyOverlayRef<T>
): Attach<T> => {
    return using(use, () => {
        const { portalOutlet, togglePositionStrategy } = use;

        if (togglePositionStrategy === use.positionStrategy) {
            return;
        }
        use.positionStrategy?.dispose();
        use.positionStrategy = togglePositionStrategy;

        if (hasAttached(portalOutlet)) {
            togglePositionStrategy.attach(use);
            // don't calls updatePositionAttach
            // cause use.positionStrategy rewrite
            use.positionStrategy.apply();
        }
    });
};
