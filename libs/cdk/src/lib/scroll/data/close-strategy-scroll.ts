import { Subscription } from 'rxjs';

import { Zonality } from '../../directive';
import { Overlay } from '../../overlay';
import { DispatcherScroll } from './dispatcher-scroll';
import { ViewportRulerScroll } from './viewport-rule-scroll';

/**
 * Config options for the CloseScrollStrategy.
 */
export type ConfigCloseStrategyScroll<T> = {
    /** Amount of pixels the user has to scroll before the overlay is closed. */
    threshold: number;
    overlay: Overlay<T>; //
};

type ChangesCloseStrategyScroll<T> = Zonality & {
    config: ConfigCloseStrategyScroll<T>;
    initialScrollPosition: number;
    overlay: Overlay<T>;
    scrollSubscriptions: Subscription[];
};

/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
export type CloseStrategyScroll<T> = Zonality &
    Partial<ChangesCloseStrategyScroll<T>> & {
        dispatcher: DispatcherScroll<T>;
        viewportRuler: ViewportRulerScroll;
    };
