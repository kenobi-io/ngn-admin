import { coerceElement } from '@angular/cdk/coercion';
import { Mono, mono } from '@core-template';
import { Subscription } from 'rxjs';

import { Scrollable } from '../../../directive';
import { DispatcherScroll } from '../../data';

type SetAncestorContainersDispatcherScroll<T> = DispatcherScroll<T> & {
    directive?: Scrollable<T>;
    directives?: Scrollable<T>[];
};
type SACDS<T> = Mono<SetAncestorContainersDispatcherScroll<T>>;

/**
 * Registered Scrollable that contain the provided element.
 * @dispatcher directive, elementOrElementRef
 */
export const setAncestorContainersDispatcherScroll = <T>(
    directive: Scrollable<T>,
    elementOrElementRef?: HTMLElement
): SACDS<T> =>
    mono((dispatcher) => {
        dispatcher.directives = [];
        dispatcher.directive = directive;
        dispatcher.scrollContainers.forEach(
            (value: Subscription, key: Scrollable<T>) => {
                directive = key;
                if (
                    containedElementDispatcherScroll(key, elementOrElementRef)
                ) {
                    dispatcher.directives?.push(directive);
                }
            }
        );
    });

/** Defined the element is contained within the provided Scrollable. */
const containedElementDispatcherScroll = <T>(
    directive: Scrollable<T>,
    elementOrElementRef?: HTMLElement
): boolean => {
    let element: HTMLElement | undefined | null =
        coerceElement(elementOrElementRef);
    const { nativeElement } = { ...directive?.elementRef };
    // Traverse through the element parents until we reach null, checking if any of the elements
    // are the scrollable's element.
    do {
        if (element == nativeElement) {
            return true;
        }
    } while ((element = element?.parentElement));

    return false;
};
