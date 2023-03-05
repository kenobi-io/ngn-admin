import { Zonality } from '../../directive';
import {
    BlockStrategyScroll,
    CloseStrategyScroll,
    ConfigCloseStrategyScroll,
    ConfigRepositionStrategyScroll,
    DispatcherScroll,
    RepositionStrategyScroll,
    ViewportRulerScroll,
} from '../../scroll';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NoopStrategyScroll = {};

type ChangeOptionsStrategyScrollOverlay<T> = {
    /**
     * Close the overlay as soon as the user scrolls.
     * @param config Configuration to be used inside the scroll strategy.
     */
    configClose: ConfigCloseStrategyScroll<T>;
    /**
     * Update the overlay's position on scroll.
     * @param config Configuration to be used inside the scroll strategy.
     * Allows debouncing the reposition calls.
     */
    configReposition: ConfigRepositionStrategyScroll<T>;
};

/**
 * Options for how an overlay will handle scrolling.
 *
 * Users can provide a custom value for `OptionsStrategyScroll` to replace the default
 * behaviors. This class primarily acts as a factory for ScrollStrategy instances.
 */
export type OptionsStrategyScrollOverlay<T> = Zonality &
    Partial<ChangeOptionsStrategyScrollOverlay<T>> & {
        /** Block scrolling. */
        block: BlockStrategyScroll;
        document: Document;
        close: CloseStrategyScroll<T>;
        reposition: RepositionStrategyScroll<T>;
        /** Do nothing on scroll. */
        noop: NoopStrategyScroll;
        dispatcher: DispatcherScroll<T>;
        viewportRulerScroll: ViewportRulerScroll;
    };
