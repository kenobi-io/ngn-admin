import { Directionality } from '@angular/cdk/bidi';
import { ElementRef, inject, InjectionToken, NgZone } from '@angular/core';
import { Model } from '@core-template';
import { fromEvent, Observable, Observer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
    changes,
    outZone,
    VIEW_CONTAINER_REF_TOKEN,
    ZONE_TOKEN,
} from '../../../platform';
import { UseScrollable } from '../../data';
import { DISPATCHER_SCROLL } from '../dispatcher';

export const CHANGE_USE_SCROLLABLE = new InjectionToken<UseScrollable<Model>>(
    '[CHANGE_USE_SCROLLABLE]'
);

export const createUseScrollable = <T>(
    change?: Partial<UseScrollable<T>>
): UseScrollable<T> => {
    const ngZone: NgZone = inject(ZONE_TOKEN);
    const elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
    const destroyed: Subject<void> = new Subject<void>();
    const use: UseScrollable<T> = {
        destroyed,
        dir: inject(Directionality),
        dispatcherScroll: inject(DISPATCHER_SCROLL),
        elementRef,
        elementScrolled: new Observable((observer: Observer<Event>) =>
            outZone(ngZone, () =>
                fromEvent(elementRef.nativeElement, 'scroll')
                    .pipe(takeUntil(destroyed))
                    .subscribe(observer)
            )
        ),
        ngZone,
        viewContainerRef: inject(VIEW_CONTAINER_REF_TOKEN),
    };
    changes(use, change, CHANGE_USE_SCROLLABLE);

    return use;
};

export const USE_SCROLLABLE = new InjectionToken<UseScrollable<Model>>(
    '[USE_SCROLLABLE]',
    {
        factory: () => createUseScrollable(),
    }
);
