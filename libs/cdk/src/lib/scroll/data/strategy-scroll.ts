import { Zonality } from '../../directive';
import { Overlay } from '../../overlay';
import { DispatcherScroll } from './dispatcher-scroll';
import { ViewportRulerScroll } from './viewport-rule-scroll';

export type StrategyScroll<T> = Zonality &
    Partial<{
        overlay: Overlay<T>;
        dispatcher: DispatcherScroll<T>;
    }> & {
        viewportRuler: ViewportRulerScroll;
    };

// eslint-disable-next-line @typescript-eslint/ban-types
export type NoopStrategyScroll<T> = StrategyScroll<T> & {};
