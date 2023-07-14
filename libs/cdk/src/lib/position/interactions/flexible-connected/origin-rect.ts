import { ElementRef } from '@angular/core';
import { Condition, tube, Unary, unary } from '@core-template';

import {
    FlexibleConnectedStrategyPosition as Fcsp,
    ResultFlexibleConnectedStrategyPosition as Rfcsp,
} from '../../data';

type Data<T> = {
    height: number;
    sp: Fcsp<T>;
    width: number;
};
type CD<T> = Condition<Data<T>>;

/** @internal Returns the ClientRect of the current origin. */
export const originRect =
    <T>(): Rfcsp<T> =>
    (strategyPosition) => {
        const value: Data<T> = {
            height: 0,
            sp: strategyPosition,
            width: 0,
        };

        tube(
            doesTheOriginInstanceofElementRef(),
            assignOriginElementRefBoundingClientRect(),
            doesTheOriginInstanceofElement(),
            assignOriginElementBoundingClientRect(),
            doesNotTheOriginInstanceof(),
            assignOriginRect()
        )(value);
        return strategyPosition;
    };

const doesTheOriginInstanceofElementRef =
    <T>(): CD<T> =>
    (model): boolean =>
        model.sp.origin instanceof ElementRef;

const doesTheOriginInstanceofElement =
    <T>(): CD<T> =>
    (model): boolean =>
        model.sp.origin instanceof Element;

const doesNotTheOriginInstanceof =
    <T>(): CD<T> =>
    (model): boolean =>
        !(model.sp.origin instanceof Element) &&
        !(model.sp.origin instanceof ElementRef);

const assignOriginElementRefBoundingClientRect = <T>(): Unary<T> =>
    unary(
        (model) =>
            (model.sp.originRect = (
                model.sp.origin as ElementRef
            ).nativeElement.getBoundingClientRect())
    );

const assignOriginElementBoundingClientRect = <T>(): Unary<T> =>
    unary(
        (model) =>
            (model.sp.originRect = (
                model.sp.origin as Element
            ).getBoundingClientRect())
    );

const assignOriginRect = <T>(): Unary<T> =>
    unary((model) => {
        const { sp } = model;
        const { origin } = sp;
        if (!(origin instanceof Element) && !(origin instanceof ElementRef)) {
            const width = origin.width || 0;
            const height = origin.height || 0;
            sp.originRect = {
                bottom: origin.y + height,
                height,
                left: origin.x,
                right: origin.x + width,
                top: origin.y,
                width,
            };
        }
    });
