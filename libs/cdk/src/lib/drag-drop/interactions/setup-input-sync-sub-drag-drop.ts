import {
    coerceArray,
    coerceBooleanProperty,
    coerceNumberProperty,
} from '@angular/cdk/coercion';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { FunctionMono, mono, tube, unary } from '@core-template';
import { UnaryFunction } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { DropList, DropListCapability } from '../data';

type DropListSetup = <
    T,
    R,
    P extends DropListCapability<CdkDropList<T>> = DropListCapability<
        CdkDropList<T>
    >
>() => UnaryFunction<P, R>;

type MonoDropListSetup = FunctionMono<DropList>;

export const setupInputSyncSubscriptionDropList: DropListSetup = () =>
    unary(({ dropList }) =>
        tube(dirChangeSubscribe(), beforeStarted())(dropList)
    );

const dirChangeSubscribe: MonoDropListSetup = () =>
    mono(({ destroyed, dir }) => {
        if (dir) {
            dir.change
                .pipe(startWith(dir.value), takeUntil(destroyed))
                .subscribe((value) => withDirection(value)());
        }
    });

const beforeStarted: MonoDropListSetup = () =>
    mono((dropList) => {
        tube(getSiblings(), resolveScrollableParents())(dropList);
    });

const getSiblings: MonoDropListSetup = () =>
    mono((dropList) => {
        const siblings = coerceArray(dropList.connectedTo).map((drop) => {
            if (typeof drop === 'string') {
                const correspondingDropList = dropList.lists.find(
                    (list) => list.id === drop
                );

                if (
                    !correspondingDropList /*  &&
                (typeof ngDevMode === 'undefined' || ngDevMode) */
                ) {
                    console.warn(
                        `CdkDropList could not find connected drop list with id "${drop}"`
                    );
                }

                return correspondingDropList!;
            }

            return drop;
        });

        if (dropList.group) {
            dropList.group._items.forEach((drop) => {
                if (siblings.indexOf(drop) === -1) {
                    siblings.push(drop);
                }
            });
        }

        dropList.siblings = siblings.filter(
            (drop) => drop && drop !== dropList
        );
    });

const resolveScrollableParents: MonoDropListSetup = () =>
    mono((dropList) => {
        if (!dropList.scrollableParentsResolved) {
            const scrollableParents = dropList.scrollDispatcher
                .getAncestorScrollContainers(dropList.element)
                .map((scrollable) => scrollable.getElementRef().nativeElement);
            withScrollableParents(scrollableParents);

            // Only do this once since it involves traversing the DOM and the parents
            // shouldn't be able to change without the drop list being destroyed.
            dropList.scrollableParentsResolved = true;
        }

        dropList.sortingDisabled = coerceBooleanProperty(
            dropList.sortingDisabled
        );
        dropList.autoScrollDisabled = coerceBooleanProperty(
            dropList.autoScrollDisabled
        );
        dropList.autoScrollStep = coerceNumberProperty(
            dropList.autoScrollStep,
            2
        );
        /*         dropList
            . */ connectedTo(
            getSiblings().map((list) => list._dropListRef)
        ).withOrientation(dropList.orientation);
    });
