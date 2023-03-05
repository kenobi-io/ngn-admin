import { Directionality } from '@angular/cdk/bidi';
import { _XAxis, _YAxis } from '@angular/cdk/scrolling';
import { Observable, Subject } from 'rxjs';

import { Use } from '../../directive';
import { DispatcherScroll } from './dispatcher-scroll';

/**
 * An extended version of ScrollToOptions that allows expressing scroll offsets relative to the
 * top, bottom, left, right, start, or end of the viewport rather than just the top and left.
 * Please note: the top and bottom properties are mutually exclusive, as are the left, right,
 * start, and end properties.
 */
// eslint-disable-next-line no-undef
export type ExtendedScrollToOptions = _XAxis & _YAxis & ScrollOptions;

type ChangesUseScrollable = {
    dir: Directionality;
    options: ExtendedScrollToOptions;
    from: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end';
    scrollTop: number;
};

export type UseScrollable<T> = Use<T, HTMLElement> &
    Partial<ChangesUseScrollable> & {
        dispatcherScroll: DispatcherScroll<T>;
        readonly elementScrolled: Observable<Event>;
        destroyed: Subject<void>;
    };
