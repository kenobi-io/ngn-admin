import {
    coerceArray,
    coerceBooleanProperty,
    coerceNumberProperty,
} from '@angular/cdk/coercion';
import { CdkDropList, DropListRef } from '@angular/cdk/drag-drop';
import { UnParamsUnary, tube, unary } from '@core-template';
import { startWith, takeUntil } from 'rxjs/operators';

type DropListSetup = UnParamsUnary<DropListRef<CdkDropList>>;

export const setupInputSyncSubscription: DropListSetup = () =>
    unary((ref) =>
        tube(
            setupDirection(),
            setupSiblings(),
            resolveScrollableParents(),
            setProperties(),
            setupConnectedTo(),
            finalizeSetup()
        )(ref)
    );

const setupDirection: DropListSetup = () =>
    unary(({ dropped }) => {
        // const { _destroyed, _dir } = ref;

        if (dropped) {
            _dir.change
                .pipe(startWith(_dir.value), takeUntil(_destroyed))
                .subscribe((value) => ref.withDirection(value));
        }
    });

const setupSiblings: DropListSetup = () =>
    unary((ref) => {
        const {
            _dropListRef,
            _group,
            _scrollDispatcher,
            connectedTo,
            element,
        } = this;

        ref.beforeStarted.subscribe(() => {
            const siblings = coerceArray(connectedTo).map((drop) => {
                if (typeof drop === 'string') {
                    const correspondingDropList = CdkDropList._dropLists.find(
                        (list) => list.id === drop
                    );

                    if (
                        !correspondingDropList &&
                        (typeof ngDevMode === 'undefined' || ngDevMode)
                    ) {
                        console.warn(
                            `CdkDropList could not find connected drop list with id "${drop}"`
                        );
                    }

                    return correspondingDropList!;
                }

                return drop;
            });

            if (_group) {
                _group._items.forEach((drop) => {
                    if (siblings.indexOf(drop) === -1) {
                        siblings.push(drop);
                    }
                });
            }

            ref.connectedTo(
                siblings
                    .filter((drop) => drop && drop !== this)
                    .map((list) => list._dropListRef)
            );
        });
    });

const resolveScrollableParents: DropListSetup = (ref) => {
    const { _dropListRef, _scrollDispatcher, element } = this;
    let _scrollableParentsResolved = false;

    ref.beforeStarted.subscribe(() => {
        if (!_scrollableParentsResolved) {
            const scrollableParents = _scrollDispatcher
                .getAncestorScrollContainers(element)
                .map((scrollable) => scrollable.getElementRef().nativeElement);
            _dropListRef.withScrollableParents(scrollableParents);

            _scrollableParentsResolved = true;
        }
    });
};

const setProperties: DropListSetup = (ref) => {
    const {
        autoScrollDisabled,
        autoScrollStep,
        disabled,
        lockAxis,
        orientation,
        sortingDisabled,
    } = this;

    ref.disabled = disabled;
    ref.lockAxis = lockAxis;
    ref.sortingDisabled = coerceBooleanProperty(sortingDisabled);
    ref.autoScrollDisabled = coerceBooleanProperty(autoScrollDisabled);
    ref.autoScrollStep = coerceNumberProperty(autoScrollStep, 2);
    ref.withOrientation(orientation);
};

const setupConnectedTo: DropListSetup = (ref) => {
    const { _dropListRef } = this;

    ref.beforeStarted.subscribe(() => {
        const siblings = _dropListRef._siblings
            .filter((drop) => drop && drop !== this)
            .map((list) => list._dropListRef);

        ref.connectedTo(siblings);
    });
};

const finalizeSetup: DropListSetup = () => {
    // This is an empty function as there is no further logic to be performed in the final step.
};
