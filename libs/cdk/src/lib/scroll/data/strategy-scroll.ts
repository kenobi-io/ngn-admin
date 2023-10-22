import { Zonality } from '../../directive';
import { Overlay } from '../../overlay';
import { DispatcherScroll } from './dispatcher-scroll';
import { ViewportRulerScroll } from './viewport-rule-scroll';

export type StrategyScroll<T = unknown> = Zonality &
    Partial<{
        overlay: Overlay<T>;
        dispatcher: DispatcherScroll<T>;
    }> & {
        viewportRulerScroll: ViewportRulerScroll;
    };

// eslint-disable-next-line @typescript-eslint/ban-types
export type NoopStrategyScroll<T = unknown> = StrategyScroll<T> & {};
