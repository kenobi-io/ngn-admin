import { Directionality } from '@angular/cdk/bidi';
import { _XAxis, _YAxis } from '@angular/cdk/scrolling';
import { Observable, Subject } from 'rxjs';

import { Ref } from './ref';

type ScrollBehavior = 'auto' | 'instant' | 'smooth';
interface ScrollOptions {
    behavior?: ScrollBehavior;
}
/**
 * An extended version of ScrollToOptions that allows expressing scroll offsets relative to the
 * top, bottom, left, right, start, or end of the viewport rather than just the top and left.
 * Please note: the top and bottom properties are mutually exclusive, as are the left, right,
 * start, and end properties.
 */
export type ExtendedScrollToOptions = _XAxis & _YAxis & ScrollOptions;

export type ChangesUseScrollable = {
    dir: Directionality;
};

export type Scrollable<T> = Ref<T, HTMLElement> &
    Partial<ChangesUseScrollable> & {
        readonly elementScrolled: Observable<Event>;
        destroyed: Subject<void>;
    };
