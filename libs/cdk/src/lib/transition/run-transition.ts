import { Bounden } from '@core-template';
import { EMPTY, fromEvent, Observable, of, race, Subject, timer } from 'rxjs';
//import { environment } from '../../environment';
import { endWith, filter, takeUntil } from 'rxjs/operators';

import { Context, Use } from '../directive';
import { runInZone } from '../run-in-zone';
import { transitionDurationInMs } from '../transition-duration-in-ms';

export type EndFnTransition = () => void;
export type StartFnTransition<T> = (
    element: HTMLElement,
    animation: boolean,
    context: T
) => EndFnTransition | void;

export interface OptionsTransition<T> {
    animation: boolean;
    runningTransition: 'continue' | 'stop';
    value: T;
}

export interface ContextTransition<T> extends Context<T> {
    transition: Subject<T>;
    complete: () => void;
}

export interface UseRunTransition<T>
    extends Bounden<Use<T, HTMLElement>, 'context' | 'elementRef' | 'ngZone'> {
    context: ContextTransition<T>;
    option: OptionsTransition<T>;
    runningTransitions: Map<HTMLElement, ContextTransition<T>>;
    startFn: StartFnTransition<T>;
    transit: Observable<T>;
    transitionTimerDelayMs: number;
}

const noopFn: EndFnTransition = () => {
    return;
};

//const runningTransitions = new Map<HTMLElement, ContextTransition<T>>();

export const runTransition = <T>(
    use: UseRunTransition<T>
): Use<T> /*Observable<void>*/ => {
    const {
        elementRef: { nativeElement },
        ngZone,
        option,
        runningTransitions,
        startFn,
        transitionTimerDelayMs,
    } = use;
    // Getting initial context from options
    let data = option.value || <T>{};

    // Checking if there are already running transitions on the given element.
    const running = runningTransitions.get(nativeElement);
    //if (running) {
    const transitions = new Map<'continue' | 'stop', () => void>()
        // If there is one running and we want for it to 'continue' to run, we have to cancel the new one.
        // We're not emitting any values, but simply completing the observable (EMPTY).
        .set('continue', () => (use.transit = EMPTY))
        // If there is one running and we want for it to 'stop', we have to complete the running one.
        // We're simply completing the running one and not emitting any values and merging newly provided context
        // with the one coming from currently running transition.
        .set('stop', () => {
            ngZone.run(() => running?.transition.complete());
            data = Object.assign(
                running?.$implicit as unknown as Iterable<T>,
                data
            );
            running && runningTransitions.delete(nativeElement);
        });
    running && transitions.get(option.runningTransition)?.();

    // Running the start function
    const endFn = startFn(nativeElement, option.animation, data) || noopFn;

    // If 'prefer-reduced-motion' is enabled, the 'transition' will be set to 'none'.
    // If animations are disabled, we have to emit a value and complete the observable
    // In this case we have to call the end function, but can finish immediately by emitting a value,
    // completing the observable and executing end functions synchronously.
    if (
        !option.animation ||
        window.getComputedStyle(nativeElement).transitionProperty === 'none'
    ) {
        ngZone.run(() => endFn());
        use.transit = of(data).pipe(runInZone(ngZone));
    }

    // Starting a new transition
    const transition = new Subject<T>();
    const finishTransition = new Subject<void>();
    const stop$ = transition.pipe(endWith(true));
    runningTransitions.set(nativeElement, {
        $implicit: data,
        complete: () => {
            finishTransition.next();
            finishTransition.complete();
        },
        transition,
    });

    const transitionDuration = transitionDurationInMs(nativeElement);

    // 1. We have to both listen for the 'transitionend' event and have a 'just-in-case' timer,
    // because 'transitionend' event might not be fired in some browsers, if the transitioning
    // element becomes invisible (ex. when scrolling, making browser tab inactive, etc.). The timer
    // guarantees, that we'll release the DOM element and complete 'runTransition'.
    // 2. We need to filter transition end events, because they might bubble from shorter transitions
    // on inner DOM elements. We're only interested in the transition on the 'element' itself.
    ngZone.runOutsideAngular(() => {
        const transitionEnd = fromEvent(nativeElement, 'transitionend').pipe(
            filter(({ target }) => target === nativeElement),
            takeUntil(stop$)
        );
        const timerStart = timer(
            transitionDuration + transitionTimerDelayMs
        ).pipe(takeUntil(stop$));

        race(timerStart, transitionEnd, finishTransition)
            .pipe(takeUntil(stop$))
            .subscribe(() => {
                runningTransitions.delete(nativeElement);
                ngZone.run(() => {
                    endFn();
                    transition.next(data);
                    transition.complete();
                });
            });
    });
    use.transit = transition.asObservable();

    return use as Use<T>;
};

// export const completeTransition = (nativeElement: HTMLElement): void => {
//     runningTransitions.get(nativeElement)?.complete();
// };
