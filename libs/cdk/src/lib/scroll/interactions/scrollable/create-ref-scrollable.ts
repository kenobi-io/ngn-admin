import { Directionality } from '@angular/cdk/bidi';
import { ElementRef, inject, InjectionToken, NgZone } from '@angular/core';
import { Model } from '@core-template';
import { fromEvent, Observable, Observer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Scrollable } from '../../../directive';
import {
    changes,
    outZone,
    VIEW_CONTAINER_REF_TOKEN,
    ZONE_TOKEN,
} from '../../../platform';

export const CHANGE_REF_SCROLLABLE = new InjectionToken<Scrollable<Model>>(
    '[CHANGE_REF_SCROLLABLE]'
);

export const createRefScrollable = <T>(
    change?: Partial<Scrollable<T>>
): Scrollable<T> => {
    const ngZone: NgZone = inject(ZONE_TOKEN);
    const elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
    const destroyed: Subject<void> = new Subject<void>();
    const ref: Scrollable<T> = {
        destroyed,
        dir: inject(Directionality),
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
    changes(ref, change, CHANGE_REF_SCROLLABLE);

    return ref;
};

export const REF_SCROLLABLE = new InjectionToken<Scrollable<Model>>(
    '[REF_SCROLLABLE]',
    {
        factory: () => createRefScrollable(),
    }
);
