import { coerceElement } from '@angular/cdk/coercion';
import { Subscription } from 'rxjs';

import { DispatcherScroll } from '../../data';
import { Scrollable } from '../../directives';

/**
 * Registered Scrollable that contain the provided element.
 * @dispatcher directive, elementOrElementRef
 */
export const setAncestorContainersDispatcherScroll = <T>(
    dispatcher: DispatcherScroll<T>
): DispatcherScroll<T> => {
    /** Defined the element is contained within the provided Scrollable. */
    const containedElementDispatcherScroll = (
        dispatcher: DispatcherScroll<T>
    ): DispatcherScroll<T> => {
        const { directive, elementOrElementRef } = dispatcher;
        let element: HTMLElement | undefined | null =
            coerceElement(elementOrElementRef);
        // const scrollableElement = directive?.getElementRef().nativeElement;
        const scrollableElement = directive?.use.elementRef?.nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                dispatcher.withinElementContained = true;

                return dispatcher;
            }
        } while ((element = element?.parentElement));
        dispatcher.withinElementContained = false;

        return dispatcher;
    };
    dispatcher.directives = [];
    dispatcher.subscriptionsOfDirectives.forEach(
        (value: Subscription, key: Scrollable<T>) => {
            dispatcher.directive = key;
            containedElementDispatcherScroll(dispatcher);
            if (dispatcher.withinElementContained) {
                dispatcher.directives?.push(key);
            }
        }
    );

    return dispatcher;
};
