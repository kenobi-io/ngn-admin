/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgZone } from '@angular/core';
import { last, tube } from '@core-template';
import { type UnaryFunction } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/ban-types
export const outZone = <T>(ngZone: NgZone, fn: Function): T =>
    ngZone.runOutsideAngular<T>(() => fn());

export type FuncZoneTube = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    func: Function;
    context?: any;
    params?: any[];
};

export type ZoneTube = {
    <T, A>(fn1: UnaryFunction<T, A>, fn?: FuncZoneTube): UnaryFunction<T, A>;
    <T, A, B>(
        fn1: UnaryFunction<T, A | boolean>,
        fn2: UnaryFunction<A, B | boolean>,
        fn?: FuncZoneTube
    ): UnaryFunction<T, B>;
    <T, A, B, C>(
        fn1: UnaryFunction<T, A | boolean>,
        fn2: UnaryFunction<A, B | boolean>,
        fn3: UnaryFunction<B, C | boolean>,
        fn?: FuncZoneTube
    ): UnaryFunction<T, C>;
    <T, A, B, C, D>(
        fn1: UnaryFunction<T, A | boolean>,
        fn2: UnaryFunction<A, B | boolean>,
        fn3: UnaryFunction<B, C | boolean>,
        fn4: UnaryFunction<C, D | boolean>,
        fn?: FuncZoneTube
    ): UnaryFunction<T, D>;
    <T, A, B, C, D, E>(
        fn1: UnaryFunction<T, A | boolean>,
        fn2: UnaryFunction<A, B | boolean>,
        fn3: UnaryFunction<B, C | boolean>,
        fn4: UnaryFunction<C, D | boolean>,
        fn5: UnaryFunction<D, E | boolean>,
        fn?: FuncZoneTube
    ): UnaryFunction<T, E>;
    <T, A, B, C, D, E, F>(
        fn1: UnaryFunction<T, A | boolean>,
        fn2: UnaryFunction<A, B | boolean>,
        fn3: UnaryFunction<B, C | boolean>,
        fn4: UnaryFunction<C, D | boolean>,
        fn5: UnaryFunction<D, E | boolean>,
        fn6: UnaryFunction<E, F | boolean>,
        fn?: FuncZoneTube
    ): UnaryFunction<T, F>;
    <T, A, B, C, D, E, F, G>(
        fn1: UnaryFunction<T, A | boolean>,
        fn2: UnaryFunction<A, B | boolean>,
        fn3: UnaryFunction<B, C | boolean>,
        fn4: UnaryFunction<C, D | boolean>,
        fn5: UnaryFunction<D, E | boolean>,
        fn6: UnaryFunction<E, F | boolean>,
        fn7: UnaryFunction<F, G | boolean>,
        fn?: FuncZoneTube
    ): UnaryFunction<T, G>;
    <T, A, B, C, D, E, F, G, H>(
        fn1: UnaryFunction<T, A | boolean>,
        fn2: UnaryFunction<A, B | boolean>,
        fn3: UnaryFunction<B, C | boolean>,
        fn4: UnaryFunction<C, D | boolean>,
        fn5: UnaryFunction<D, E | boolean>,
        fn6: UnaryFunction<E, F | boolean>,
        fn7: UnaryFunction<F, G | boolean>,
        fn8: UnaryFunction<G, H | boolean>,
        fn?: FuncZoneTube
    ): UnaryFunction<T, H>;
    <T, A, B, C, D, E, F, G, H, I>(
        fn1: UnaryFunction<T, A | boolean>,
        fn2: UnaryFunction<A, B | boolean>,
        fn3: UnaryFunction<B, C | boolean>,
        fn4: UnaryFunction<C, D | boolean>,
        fn5: UnaryFunction<D, E | boolean>,
        fn6: UnaryFunction<E, F | boolean>,
        fn7: UnaryFunction<F, G | boolean>,
        fn8: UnaryFunction<G, H | boolean>,
        fn9: UnaryFunction<H, I | boolean>,
        fn?: FuncZoneTube
    ): UnaryFunction<T, I>;
    <T, A, B, C, D, E, F, G, H, I>(
        fn1: UnaryFunction<T, A | boolean>,
        fn2: UnaryFunction<A, B | boolean>,
        fn3: UnaryFunction<B, C | boolean>,
        fn4: UnaryFunction<C, D | boolean>,
        fn5: UnaryFunction<D, E | boolean>,
        fn6: UnaryFunction<E, F | boolean>,
        fn7: UnaryFunction<F, G | boolean>,
        fn8: UnaryFunction<G, H | boolean>,
        fn9: UnaryFunction<H, I | boolean>,
        ...fns: UnaryFunction<any, any>[]
    ): UnaryFunction<T, unknown>;
};

export const outNgZone: ZoneTube =
    (...fns: any[]) =>
    (input: any) => {
        if (hasProperty(input, 'ngZone')) {
            let zoneWrap: FuncZoneTube = last(fns) as FuncZoneTube;
            if (zoneWrap && hasProperty(zoneWrap, 'func')) {
                zoneWrap = fns.pop();
                const { context: thisArg, func, params } = zoneWrap;
                let fn;
                !params
                    ? (fn = func.bind(thisArg))
                    : (fn = func.bind(thisArg, ...params));
                input.ngZone.runOutsideAngular(fn(() => tube(...fns)(input)));
            } else {
                input.ngZone.runOutsideAngular(() => tube(...fns)(input));
            }
        }
        return input;
    };

const hasProperty = <T extends object>(obj: T, property: keyof T): boolean => {
    return property in obj;
};
